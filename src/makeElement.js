
/** Class to create an html element with optional socket. */
class makeElement {
  /**
   * Create an element
   * 
   * @param {string} type element type to create (H1, P, HR, etc.)
   * @param {*} styleClass className for element
   * @param {*} _socket optional socket
   */
  constructor(type, styleClass, _socket = null){
    this._element = document.createElement(type)
    this._element.className = styleClass
    if (_socket) {
      _socket.on('sensor', (data) => {
        console.log('on sensor')
        this.setInner( JSON.stringify(data))
      })
    }
  }
  /**
   * Return the underlying element.
   */
  getEl(){
    return this._element
  }
  /**
   * Append the element to the document body
   */
  addToBody(){
    document.body.appendChild(this._element)
  }
  /**
   * 
   * @param {string} text text to set the innerHTML as
   */
  setInner (text){
    this._element.innerHTML = text
  }
}
export default makeElement
