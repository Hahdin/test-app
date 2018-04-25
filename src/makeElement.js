class makeElement {
  constructor(type, styleClass, _socket = null){
    this._element = document.createElement(type)
    this._element.className = styleClass
    if (_socket) {
      _socket.on('sensor', (data) => {
        this.setInner( JSON.stringify(data))
      })
    }
  }
  getEl(){
    return this._element
  }
  addToBody(){
    document.body.appendChild(this._element)
  }
  setInner (text){
    this._element.innerHTML = text
  }
}
export default makeElement
