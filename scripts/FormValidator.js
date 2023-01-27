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
  
  
  _checkInputValidity(formElement, inputElement, config) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  }
  
  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid)
  }
  
  function toggleButtonState(inputList, buttonElement, config) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
  
  function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
    toggleButtonState(inputList, buttonElement, config);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      })
    })
  }
  
  function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
  
    formList.forEach((formElement) => {
      setEventListeners(formElement, config);
    })
  }

}