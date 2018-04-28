
import makeElement from './makeElement'
let connection = new WebSocket('ws://127.0.0.1:5050');
connection.onopen = function () {
  console.log('con open')
};

connection.onerror = function (error) {
  console.log('con error', error)
};
/**
 * Create a list with the incoming messages.
 */
const makeList = () => {
  let $messages = $('.messages'); // Messages area
    connection.onmessage =  (_data) =>{
      let data = JSON.parse(_data.data)
      console.log('on sensor', data)
      const li = new makeElement('li', 'div2')
      let time = data.message['Server/Timestamp']
      let id = data.message['Origin/Address']
      let value = parseFloat(data.message['Reading/Pressure'])
      li.setInner(JSON.stringify(data))
      let $el = $(li.getEl())
      $messages.prepend($el)
      $el.fadeOut(15000)
    }
}

makeList()
