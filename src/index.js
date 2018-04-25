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
  socket.on('sensor', (data) => {
    const li = new makeElement('li', 'div2')
    li.setInner(JSON.stringify(data))
    let $el = $(li.getEl())
    $messages.prepend($el)
    $el.fadeOut(30000)
  })
}

//makePage()
makeList()
