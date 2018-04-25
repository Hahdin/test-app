const kafka = require('kafka-node')
let client = null

module.exports = {
  createClient: (op) => {
      return new Promise((resolve, reject) => {
          client = new kafka.KafkaClient(op)
          client.on('ready', () => {
            resolve('client ready')
          })
          client.on('error', (error) => {
            console.log(Date(), error)
            reject(error)
          })
      })
  },
  buildMessage: (topic, data) =>{
    let dataKM = new kafka.KeyedMessage(topic, JSON.stringify(data))
    return [{ topic: topic, messages: dataKM, partition: 0 }]
  },
  getClient: () => client,
  getProducer: () => kafka.Producer,
  getConsumer: () => kafka.Consumer,
  getOffset: () => {
    return new kafka.Offset(client)
  },

}