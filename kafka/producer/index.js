let isProducerReady = false
let producer = null
module.exports = {
  create: (client) => (Producer) => {
    try {
      producer = new Producer(client)
      producer.on('ready', () => {
        isProducerReady = true;
      })
      producer.on('error', (err) => {
        console.error(err, Date());
      })
    }
    catch (e) {
      isProducerReady = false
      console.error(e, client, Date())
    }
  },
  send: (payload, cb) =>{
    producer.send(payload, (err, data) => {
      if (err){
        console.log(err, Date())
        cb(err, null); return
      }
      cb(null, data)
    })
  },
  isReady: () => isProducerReady
}