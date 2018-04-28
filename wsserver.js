
/**
 * Server, socket and kafka service for the back end.
 */
import express from 'express'
import myService from './kafka/service'
import http from 'http'
import { server as WebSocketServer } from "websocket";

const port = 5050
const app = express()
app.use(express.static('dist'))
const server = http.createServer(app)
let connection = null
server.listen(port, ()  =>{
  console.log('Server listening at port %d', port);
})

const wsServer = new WebSocketServer({
  httpServer: server
})
wsServer.on('request', (request) => {
  console.log('on request')
  connection = request.accept(null, request.origin)
  connection.on('close', (connection) => {
    console.log('user left')
  })
  
})

/**
 * Callback for the kafka pubsub.
 * Emits the message to the server socket.
 * 
 * @param {string} message          the message
 */
const messageCallback = (message) =>{
  console.log(message)
  let msg = JSON.parse(message.value)
  if (connection)
    connection.sendUTF(message.value)
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
