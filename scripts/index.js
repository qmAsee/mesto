import { validationConfig, FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";

const buttonOpenPopupEditProfile = document.querySelector('.profile__edit');
const popups = document.querySelectorAll('.popup');
const editPopup = document.querySelector('.popup_type_edit')
const buttonsClosePopup = document.querySelectorAll('.popup__close');
const popupName = document.querySelector('.popup__input_type_name');
const popupProfession = document.querySelector('.popup__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__description');
const popupEditSave = document.querySelector('.popup__form_edit');
const formAddCard = document.querySelector('.popup__form_add')
const addCardPopup = document.querySelector('.popup_type_add')
const buttonOpenPopupAddCard = document.querySelector('.profile__add')
const cardsContainer = document.querySelector('.elements');
const titleCardElem = document.querySelector('.popup__input_type_place-name');
const linkCardElem = document.querySelector('.popup__input_type_place-link');

const editPopupValidation = new FormValidator(validationConfig, popupEditSave);
const addPopupValidation = new FormValidator(validationConfig, formAddCard);
editPopupValidation.enableValidation();
addPopupValidation.enableValidation();

export function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keyup', escClose);
}

export function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keyup', escClose);
}

export function escClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopups = document.querySelector('.popup_opened')
    closePopup(openedPopups)
  }
}

function submitEditProfileForm(event) {
  event.preventDefault();
  profileName.textContent = popupName.value;
  profileProfession.textContent = popupProfession.value;
  closePopup(editPopup);
}

popupEditSave.addEventListener('submit', submitEditProfileForm);

buttonOpenPopupEditProfile.addEventListener('click', function () {
  openPopup(editPopup);
  popupName.value = profileName.innerText;
  popupProfession.value = profileProfession.innerText;
});

buttonOpenPopupAddCard.addEventListener('click', function () {
  openPopup(addCardPopup);
  addPopupValidation.disableSubmitButton();
});

buttonsClosePopup.forEach(button => button.addEventListener('click', () => {
  const currentPopup = button.closest('.popup');
  closePopup(currentPopup);
}));

popups.forEach(popup => popup.addEventListener('click', (evt) => {
  if(evt.target === popup) {
    closePopup(popup);
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

const createCard = (item) => {
  const card = new Card(item, '.card-template');
  const newCard = card.generateCard();
  addCard(newCard);
}

const addCard = (card) => {
  cardsContainer.prepend(card);
}

cardElements.forEach((item) => {
  createCard(item)
})

formAddCard.addEventListener('submit', function (evt) {
  evt.preventDefault();

  createCard({name: titleCardElem.value, link: linkCardElem.value});
  closePopup(addCardPopup);
  formAddCard.reset();
});