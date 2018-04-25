const myKafkaClient = require('../client')
const myConsumer = require('../consumer')
const myProducer = require('../producer')
let serviceStarted = false
module.exports = {
  startService: (server, messageCallback = null) => {
    return new Promise((resolve, reject) => {
      try {
        myKafkaClient.createClient({ kafkaHost: server })
          .then(pr => {
            serviceStarted = true
            resolve('service started', server, Date())
          })
          .catch(reason => {
            console.log(reason)
            reject(reason)
          })
        myConsumer.create(myKafkaClient.getClient())(myKafkaClient.getConsumer(), myKafkaClient.getOffset(), messageCallback)
        myProducer.create(myKafkaClient.getClient())(myKafkaClient.getProducer())
      }
      catch (e) {
        console.log(e)
      }
    })
  },
  sendMessage: (topic, data, cb) => {
    if (myProducer.isReady()) {
      myProducer.send(myKafkaClient.buildMessage(topic, data), (err, data) => {
        if (err) 
          return cb(err, null)
        cb(null, data)
      })
    } else 
      cb("sorry, Producer is not ready yet, failed to produce message to Kafka.", null)
  },
  Consumer: myConsumer,
  Producer: myProducer,
  Client: myKafkaClient,
  IsStarted: () => serviceStarted,
  AddTopics: (topics) => {
    myConsumer.addTopics(topics)
  }
}


