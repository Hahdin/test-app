
//require('socket.io-client')
var io = require('socket.io-client');
let socket = io()
import makeElement from './makeElement'

const makePage = () => {
  const el = new makeElement('div', 'div2', socket)
  const header = new makeElement('hr', '')
  const title = new makeElement('h1', '')
  title.setInner('Welome to my Page')
  title.addToBody()
  header.addToBody()
  el.addToBody()
}


const makeList = () => {
  let $messages = $('.messages'); // Messages area
  socket.emit('join', 'myid')
  socket.on('sensor', (data) => {
    console.log('on sensor')
    const li = new makeElement('li', 'div2')
    //console.log(data)
    let time = data.message['Server/Timestamp']
    let id = data.message['Origin/Address']
    let value = parseFloat(data.message['Reading/Pressure'])

    li.setInner(JSON.stringify(data))
    let $el = $(li.getEl())
    $messages.prepend($el)
    $el.fadeOut(15000)
  })
}

//makePage()
makeList()
