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
const cardAddButton = document.querySelector('.popup__button_type_add');
const cardPopup = document.querySelector('.popup_type_pic')
const cardPopupImage = document.querySelector('.popup__image')
const cardPopupCaption = document.querySelector('.popup__caption');
const titleCardElem = document.querySelector('.popup__input_type_place-name');
const linkCardElem = document.querySelector('.popup__input_type_place-link');
const popupButton = formAddCard.querySelector('.popup__button_type_add');
const popupInputs = Array.from(formAddCard.querySelectorAll('.popup__input'))

function openPopup(item) {
  item.classList.add('popup_opened');
  document.addEventListener('keyup', escClose);
}

function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keyup', escClose);
}

function escClose(evt) {
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
  toggleButtonState(popupInputs, popupButton, validationConfig);
  openPopup(addCardPopup);
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
    name: '??????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: '?????????????????????? ??????????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: '??????????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: '????????????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: '???????????????????????? ??????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: '????????????',
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

  cardImage.addEventListener('click', function() {
    openPopup(cardPopup);
    cardPopupImage.src = cardLink;
    cardPopupImage.alt = cardTitle;
    cardPopupCaption.textContent = cardTitle;
  });
  return cardContentClone
} 

const addCard = (newCard) => {
  cardsContainer.prepend(newCard);
}

cardElements.forEach((item) => {
  addCard(createCard(item.name, item.link))
})

formAddCard.addEventListener('submit', function (evt) {
  evt.preventDefault();

  addCard(createCard(titleCardElem.value, linkCardElem.value));
  closePopup(addCardPopup);

  formAddCard.reset();
});

enableValidation(validationConfig);






