import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues() { //функция возвращает объект _formValues
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value
    })

    return this._formValues;
  }

  close() {
    super.close(); // вызывается метод из родительского класса
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListeners() // вызывается метод из родительского класса
    this._popupForm.addEventListener('submit', (evt) => { // вешаются обработчики
        evt.preventDefault();

        this._handleFormSubmit(this._getInputValues()) // аргументом принимается объект из _getInputValues
    });
  }
}