const editProfile = document.querySelector('.profile__edit');
const popup = document.querySelectorAll('.popup');
const popupContent = document.querySelector('.popup__content')
const editPopup = document.querySelector('.popup_type_edit')
const popupClose = document.querySelectorAll('.popup__close');
const popupName = document.querySelector('.popup__input_type_name');
const popupProfession = document.querySelector('.popup__input_type_profession');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__description');
const editSave = document.querySelector('.popup__content');
const addCardPopup = document.querySelector('.popup_type_add')
const addCardButton = document.querySelector('.profile__add')
const cardsContainer = document.querySelector('.elements');
const cardAddButton = document.querySelector('.popup__button_type_add');
const cardPopup = document.querySelector('.popup_type_pic')
const cardPopupImage = document.querySelector('.popup__image')
const cardPopupCaption = document.querySelector('.popup__caption');




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

editSave.addEventListener('submit', handleFormSubmit);

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
    name: 'Спанч Боб',
    link: 'https://images.unsplash.com/photo-1618962419009-5a82d310c3be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80'
  },
  {
    name: 'Патрик Стар',
    link: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80'
  },
  {
    name: 'Сквидвард Тэнтаклз',
    link: 'https://images.unsplash.com/photo-1628944681206-2ee8d63b0a6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
  },
  {
    name: 'Мистер Крабс',
    link: 'https://images.unsplash.com/photo-1582925115738-ce07891d0e43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80'
  },
  {
    name: 'Сэнди Чикс',
    link: 'https://images.unsplash.com/photo-1610629029949-20c90405b12b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    name: 'Улитка Гэри',
    link: 'https://images.unsplash.com/photo-1603218853073-ce98875097fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1189&q=80'
  }
];

const cardElements = initialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link,
  }
});

cardElements.forEach((item) => {
  addCard(item.name, item.link)
})

function addCard(cardTitle, cardLink) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardContentClone = cardTemplate.querySelector('.card').cloneNode(true);

  cardContentClone.querySelector('.card__image').src = cardLink;
  cardContentClone.querySelector('.card__image').alt = cardTitle;
  cardContentClone.querySelector('.card__title').textContent = cardTitle;

  cardsContainer.prepend(cardContentClone);

  cardContentClone.querySelector('.card__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like_active');
  });

  cardContentClone.querySelector('.card__trash').addEventListener('click', function () {
    cardContentClone.remove();
  });

  cardContentClone.querySelector('.card__image').addEventListener('click', function() {
    openPopup(cardPopup);
    cardPopupImage.src = cardLink;
    cardPopupImage.alt = cardTitle;
    cardPopupCaption.textContent = cardTitle;
  });


} 

cardAddButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  const titleCardElem = document.querySelector('.popup__input_type_place-name');
  const linkCardElem = document.querySelector('.popup__input_type_place-link');
  addCard(titleCardElem.value, linkCardElem.value);
  closePopup(addCardPopup);

  titleCardElem.value = "";
  linkCardElem.value = "";
});








