import { validationConfig, FormValidator } from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import './index.css'

import { buttonOpenPopupEditProfile, buttonOpenPopupAddCard,
profileName, profileJob, popupTypeEdit, popupTypeAdd,
popupTypePic, popupFormEdit, popupFormAdd, popupInputName,
popupInputJob, cardsContainer, initialCards } from '../utils/constants.js'

// ФУНКЦИОНАЛ

// Вкл валидацию

const editPopupValidation = new FormValidator(validationConfig, popupFormEdit);
const addPopupValidation = new FormValidator(validationConfig, popupFormAdd);
editPopupValidation.enableValidation();
addPopupValidation.enableValidation();


// экземпляр инфы о юзере

const userInfo = new UserInfo({name: profileName, description: profileJob});


// попап с карточкой

const popupWithImage = new PopupWithImage(popupTypePic  );
popupWithImage.setEventListeners();


// Создание карточек и их добавление 

const defaultCardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    defaultCardSection.addItem(createCard({name: item.name, link: item.link}));
  }
}, cardsContainer)

defaultCardSection.renderElements();

// (DONE) попап формы добавления карточки

const popupWithCard = new PopupWithForm(popupTypeAdd,
  { handleFormSubmit: (formInput) => {
    const newCard = createCard(formInput);
      defaultCardSection.addItem(newCard)
      popupWithCard.close()
  }
  });

  popupWithCard.setEventListeners();


// (DONE) попап формы редактирования профиля

const popupWithProfile = new PopupWithForm(popupTypeEdit,
  { handleFormSubmit: () => {
    userInfo.setUserInfo({name: popupInputName.value, description: popupInputJob.value});
    popupWithProfile.close();
  }});

popupWithProfile.setEventListeners();


// открыть попап редактирования профиля

buttonOpenPopupEditProfile.addEventListener('click', () => { 
  popupWithProfile.open();
  
  const {name, description} = userInfo.getUserInfo();
  popupInputName.value = name;
  popupInputJob.value = description;
});


// открыть попап добавления карточки

buttonOpenPopupAddCard.addEventListener('click', function () { 
  popupWithCard.open();
  addPopupValidation.disableSubmitButton();
});


// создать карточку

function createCard (item) {
  const card = new Card({ name: item.name, link: item.link }, '#card-template', (name, link) => {
    popupWithImage.open(name, link)
  }); 
  return card.generateCard();
}







