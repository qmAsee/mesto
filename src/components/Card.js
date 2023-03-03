export default class Card {
  constructor(data, templateSelector, openPopupImage, handleCardDelete, handleClickLike, userId) {
    this._name = data.name; 
    this._link = data.link;
    this._templateSelector = templateSelector; 

    
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._cardId = data._id;

    this._likes = data.likes;
    this._isLiked = false;

    this._handleClickLike = handleClickLike;
    this._handleDeleteCard = handleCardDelete;
    this._openPopupImage = openPopupImage;
  }
  
  _createTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content  
    .querySelector('.card')
    .cloneNode(true);
    return cardElement;
  }

  get isCardLiked() {
    return this._isLiked;
  }

  toggleIsLiked() {
    this._isLiked = !this._isLiked;
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this._numLikes.textContent = this._likes.length;
    this._elementLike.classList.toggle('card__like_active')
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard () {  
    this._element = this._createTemplate();

    this._elementLike = this._element.querySelector('.card__like');
    this._elementTrash = this._element.querySelector('.card__trash');
    this._elementImg = this._element.querySelector('.card__image'); 
    this._elementTitle = this._element.querySelector('.card__title');
    this._numLikes = this._element.querySelector('.card__calc');

    this._numLikes.textContent = this._likes.length; 

    this._elementImg.src = this._link;  
    this._elementImg.alt = this._name;
    this._elementTitle.textContent = this._name;
    
    if (this._likes.some(like => like._id === this._userId)) {
      this._elementLike.classList.add('card__like_active');
      this._isLiked = true;
    }
  
    if (this._userId !== this._ownerId) {
      this._elementTrash.remove()
    }
     
    this._setEventListeners();
      
    return this._element; 
  }  

  _setEventListeners() {
    this._elementTrash.addEventListener('click', () => {  
      this._handleDeleteCard(this)
    })

    this._elementLike.addEventListener('click', () => {
      this._handleClickLike(this)  
    })

    this._elementImg.addEventListener('click', () => {
      this._openPopupImage(this._name, this._link);
    })
  }
}