import { openPopup } from './index.js'

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }
  
  _createTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content  
    .querySelector('.card')
    .cloneNode(true);
    return cardElement;
  }

  generateCard () {
    this._element = this._createTemplate();
    this._elementLike = this._element.querySelector('.card__like');
    this._elementTrash = this._element.querySelector('.card__trash');
    this._elementImg = this._element.querySelector('.card__image');
    this._elementTitle = this._element.querySelector('.card__title');

    this._setEventListeners();
    this._elementImg.src = this._link;
    this._elementImg.alt = this._name;
    this._elementTitle.textContent = this._name;
    return this._element;
  }

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
        this._elementLike.classList.toggle('card__like_active')
    })

    this._elementTrash.addEventListener('click', () => {
      this._element.remove();
    })

    this._elementImg.addEventListener('click', () => {
      const popupImage = document.querySelector('.popup_type_pic');
      openPopup(popupImage);
      document.querySelector('.popup__image').src = this._link;
      document.querySelector('.popup__image').alt = this._name;
      document.querySelector('.popup__caption').textContent = this._name;
    })
  }
  
}