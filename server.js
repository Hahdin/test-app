
/**
 * Server, socket and kafka service for the back end.
 */
import express from 'express'
import myService from "./kafka/service"
import http from 'http'
import socket from 'socket.io'

const port = 5050
const app = express()
app.use(express.static('dist'))
const server = http.createServer(app)
const io = socket(server)

server.listen(port, ()  =>{
  console.log('Server listening at port %d', port);
})


/**
 * Callback for the kafka pubsub.
 * Emits the message to the server socket.
 * 
 * @param {string} message          the message
 */
const messageCallback = (message) =>{
  //console.log(message)
  let msg = JSON.parse(message.value)
  io.emit('sensor', msg)
}

/**
 * Start the service.
 */
myService.startService('localhost:9092', messageCallback)
  .then(pr => {
      myService.AddTopics({ topic: 'test' })
  })
  .catch(reason => {
      console.log(reason, Date())
  })
