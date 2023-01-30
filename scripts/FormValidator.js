export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  errorClassHidden: 'popup__error',
};

export class FormValidator {
constructor(validationConfig, formElement) {
  /* ПЕРЕМЕННЫЕ*/
  this._validationConfig = validationConfig;
  this._formElement = formElement;
  this._formSelector = validationConfig.formSelector;
  this._inputSelector = validationConfig.inputSelector;
  this._submitButtonSelector = validationConfig.submitButtonSelector;
  this._inactiveButtonClass = validationConfig.inactiveButtonClass;
  this._inputErrorClass = validationConfig.inputErrorClass;
  this._errorClass = validationConfig.errorClass;
  this._errorClassHidden = validationConfig.errorClassHidden;
  /* МАССИВ ВСЕХ ИНПУТОВ */
  this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  /* КНОПКА САБМИТА */
  this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
}

_showInputError(inputElement) {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.remove(this._errorClassHidden);
  errorElement.classList.add(this._errorClass);
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(this._inputErrorClass);
}

_hideInputError(inputElement) {
  const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);

  errorElement.classList.add(this._errorClassHidden);
  errorElement.classList.remove(this._errorClass);
  errorElement.textContent = ' ';
  inputElement.classList.remove(this._inputErrorClass);
}


_checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement);
  } else {
    this._hideInputError(inputElement);
  }
}

_hasInvalidInput() {
  return this._inputList.some((inputElement) => !inputElement.validity.valid)
}

_toggleButtonState() {
  if (this._hasInvalidInput()) {
    this._buttonElement.classList.remove(this._submitButtonSelector);
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  } else {
    this._buttonElement.classList.add(this._submitButtonSelector);
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }
}

_setEventListeners() {
  this._toggleButtonState(this._inputList);

  this._inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState();
    })
  })
}

enableValidation() {
 this._setEventListeners();
}

disableSubmitButton() {
  this._toggleButtonState();
};

}