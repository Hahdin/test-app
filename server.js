import express from 'express'
import myService from "./kafka/service"
import http from 'http'
import socket from 'socket.io'

const port = 5050
const app = express()
app.use(express.static('dist'))
const server = http.createServer(app)
const io = socket(server)
let _id 
server.listen(port, ()  =>{
  console.log('Server listening at port %d', port);
})

const messageCallback = (message) =>{
  let msg = JSON.parse(message.value)
  io.emit(_id, msg)
}

io.on('connect', (socket) =>{
    socket.on('join', (id) =>{
      console.log('join request')
      _id = id
      socket.join(_id)
    })
})

myService.startService('localhost:9092', messageCallback)
  .then(pr => {
      myService.AddTopics({ topic: 'test' })
  })
  .catch(reason => {
      console.log(reason, Date())
  })
