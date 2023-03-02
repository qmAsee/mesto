import Popup from './Popup.js'

export default class PopupConfirmation extends Popup {
  constructor(popupSelector, handleDeleteSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._button = this._popup.querySelector('.popup__button');
    this._handleDeleteSubmit = handleDeleteSubmit;
  }

  changeButtonText(text) {
    this._button.textContent = text;
  }

  open(card, cardId) {
    super.open();
    this._card = card;
    this._cardId = cardId
  }
 
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleDeleteSubmit(this._card, this._cardId);
        super.close();
    });
    
  }
}