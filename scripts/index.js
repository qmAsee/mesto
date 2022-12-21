const editProfile = document.querySelector('.profile__edit');
const popup = document.querySelectorAll('.popup');
const editPopup = document.querySelector('.popup_type_edit')
const popupClose = document.querySelectorAll('.popup__close');
const popupName = document.querySelector('.popup__input_type_name');
const popupProfession = document.querySelector('.popup__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__description');
const popupEditSave = document.querySelector('.popup__form_edit');
const popupAddSave = document.querySelector('.popup__form_add')
const addCardPopup = document.querySelector('.popup_type_add')
const addCardButton = document.querySelector('.profile__add')
const cardsContainer = document.querySelector('.elements');
const cardAddButton = document.querySelector('.popup__button_type_add');
const cardPopup = document.querySelector('.popup_type_pic')
const cardPopupImage = document.querySelector('.popup__image')
const cardPopupCaption = document.querySelector('.popup__caption');
const titleCardElem = document.querySelector('.popup__input_type_place-name');
const linkCardElem = document.querySelector('.popup__input_type_place-link');
const cardTemplate = document.querySelector('#card-template').content;
const cardContentClone = cardTemplate.querySelector('.card').cloneNode(true);

function openPopup(item) {
  item.classList.add('popup_opened');
}

function closePopup(item) {
  item.classList.remove('popup_opened');
}

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = popupName.value;
  profileProfession.textContent = popupProfession.value;
  closePopup(editPopup);
}

popupEditSave.addEventListener('submit', handleFormSubmit);

editProfile.addEventListener('click', function () {
  openPopup(editPopup);
  popupName.value = profileName.innerText;
  popupProfession.value = profileProfession.innerText;
});

addCardButton.addEventListener('click', function () {
  openPopup(addCardPopup);
});

popupClose.forEach(i => i.addEventListener('click', () => {
  const closeBtn = i.closest('.popup');
  closePopup(closeBtn);
}));
popup.forEach(i => i.addEventListener('click', (evt) => {
  const popupCloseEmptySpace = i.closest('.popup')
  if(evt.target == popupCloseEmptySpace) {
    closePopup(popupCloseEmptySpace);
  }
}));


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardElements = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link,
  }
});




const createCard = (cardTitle, cardLink) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardContentClone = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardContentClone.querySelector('.card__image');

  cardImage.src = cardLink;
  cardImage.alt = cardTitle;
  cardContentClone.querySelector('.card__title').textContent = cardTitle;

  cardContentClone.querySelector('.card__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like_active');
  });

  cardContentClone.querySelector('.card__trash').addEventListener('click', function () {
    cardContentClone.remove();
  });

  const addCard = () => {
    cardsContainer.prepend(cardContentClone);
  }

  cardContentClone.querySelector('.card__image').addEventListener('click', function() {
    openPopup(cardPopup);
    cardPopupImage.src = cardLink;
    cardPopupImage.alt = cardTitle;
    cardPopupCaption.textContent = cardTitle;
  });

  addCard();
} 

cardElements.forEach((item) => {
  createCard(item.name, item.link)
})


popupAddSave.addEventListener('submit', function (evt) {
  evt.preventDefault();

  createCard(titleCardElem.value, linkCardElem.value);
  closePopup(addCardPopup);

  titleCardElem.value = "";
  linkCardElem.value = "";
});








