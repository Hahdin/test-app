
let IsConsumerReady = true// assume creation works, error will toggle this
let consumer = null
const find = require('lodash/find')
module.exports = {
  addTopics : (topics) =>{
    if (!IsConsumerReady){
      return
    }
    if (find(consumer.payload, ['topic', `${topics.topic}`])){
      return
    }
    consumer.addTopics([topics], (err, added) => {
      if (err)
        console.log(err)
    })
  },
  isReady: () => IsConsumerReady,
  create: (client) => (Consumer, offset, messageCallback = null) => {
    try {
      IsConsumerReady = true
      let topics = []
      let options = {
        autoCommit: false,
        fetchMaxWaitMs: 1000,
        fetchMaxBytes: 1024 * 1024.,
        fromOffset: false
      }
      //create a consumer
      consumer = new Consumer(client, topics, options)
      consumer.on('message', (message) => {
        if(messageCallback)
          messageCallback(message)
      })
      consumer.on('error', (error) => {
        console.log(Date(), error)
        IsConsumerReady = false// broken now
      })
      consumer.on('offsetOutOfRange', (topic) => {
        topic.maxNum = 2
        offset.fetch([topic], function (err, offsets) {
          var min = Math.min.apply(null, offsets[topic.topic][topic.partition])
          consumer.setOffset(topic.topic, topic.partition, min)
        })
      })
    }
    catch (e) {
      IsConsumerReady = false
      console.log(e, client, Date())
    }
  }
}