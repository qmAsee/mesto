export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._closeButton = this._popupSelector.querySelector('.popup__close')
  }

  open() {
    this._popupSelector.classList.add('popup_opened')
    document.addEventListener('keydown', this._handleEscClose)
  }

  close() {
    this._popupSelector.classList.remove('popup_opened')
    document.removeEventListener('keydown', this._handleEscClose)
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  
  setEventListeners() {
    this._closeButton.addEventListener('click', () => this.close());
    
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target === this._popupSelector) {
        this.close();
      }
    });
  }
}
