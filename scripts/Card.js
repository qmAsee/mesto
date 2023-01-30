import { openPopup } from './index.js'

export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._imagePopup = document.querySelector('.popup_type_pic');
    this._imagePopupPic = document.querySelector('.popup__image');
    this._imagePopupCap = document.querySelector('.popup__caption');
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

  _toggleLike(){
    this._elementLike.classList.toggle('card__like_active')
  }

  _deleteCard() {
    this._element.remove(); 
  }

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
      this._toggleLike();
    })

    this._elementTrash.addEventListener('click', () => {
      this._deleteCard();
    })

    this._elementImg.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    })
  }
  
}