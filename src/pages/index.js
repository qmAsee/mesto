import { validationConfig, FormValidator } from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupConfirmation from "../components/PopupConfirmation.js";
import './index.css';

import { buttonOpenPopupEditProfile, buttonOpenPopupAddCard,
profileName, profileJob, popupFormEdit, popupFormAdd, popupInputName,
popupInputJob, cardsContainer, profileAvatar, avatarOverlay, popupFormAvatar } from '../utils/constants.js'

import { apiSettings } from "../utils/apiSettings.js"; 
import Api from "../components/Api.js"; 

// ФУНКЦИОНАЛ

// Вкл валидацию

const editPopupValidation = new FormValidator(validationConfig, popupFormEdit);
const addPopupValidation = new FormValidator(validationConfig, popupFormAdd);
const avatarPopupValidation = new FormValidator(validationConfig, popupFormAvatar);
editPopupValidation.enableValidation();
addPopupValidation.enableValidation();
avatarPopupValidation.enableValidation();

//API

const api = new Api(apiSettings)


let userId;


Promise.all([api.getUserInfo(), api.getInitialCards()]) 
  .then(([profileData, cards]) => {
    userInfo.setUserInfo(profileData);
    userInfo.setUserAvatar(profileData)
    userId = profileData._id
    defaultCardSection.renderElements(cards)
  })
  .catch(err => console.log(err))


  // Попап удаления карточки

  const popupConfirm = new PopupConfirmation('.popup_type_sure', handleDeleteSubmit)
  popupConfirm.setEventListeners();
  
  function handleDeleteSubmit(card) {
    popupConfirm.changeButtonText('Удаление...');
    api.deleteCard(card._cardId)
      .then((res) => {
        card.removeCard(res)
        popupConfirm.close()
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        popupConfirm.changeButtonText('Удалить');
      })
  
  }


  // Создание карточек и их добавление 

const defaultCardSection = new Section({
  renderer: (card) => {
    defaultCardSection.addItem(createCard(card));
  }
}, cardsContainer)

// экземпляр инфы о юзере

const userInfo = new UserInfo({
  name: profileName,
  profession: profileJob,
  avatar: profileAvatar,
});


// попап с карточкой

const popupWithImage = new PopupWithImage('.popup_type_pic');
popupWithImage.setEventListeners();


// (DONE) попап формы добавления карточки

const popupWithCard = new PopupWithForm('.popup_type_add',
  { handleFormSubmit: (cardElement) => {
    popupWithCard.changeButtonText('Сохранение...')
    api.addCard(cardElement)
      .then(res => {
        defaultCardSection.addItem(createCard(res))
        popupWithCard.close()
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        popupWithCard.changeButtonText('Создать')
      })
    } 
  });

  popupWithCard.setEventListeners(); 


// (DONE) попап формы редактирования профиля

const popupWithProfile = new PopupWithForm('.popup_type_edit',
  { handleFormSubmit: (profileData) => {
    popupWithProfile.changeButtonText('Сохранение...')
    api.setUserInfo(profileData)
      .then(res => {
        userInfo.setUserInfo(res)
        popupWithProfile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupWithProfile.changeButtonText('Сохранить'))
  }});

  popupWithProfile.setEventListeners();

// Попап формы смены аватара 

const popupWithAvatar = new PopupWithForm('.popup_type_avatar', 
  { handleFormSubmit: (profileData) => {
    popupWithAvatar.changeButtonText('Сохранение...')
    api.putAvatar(profileData.avatar)
      .then(res => {  
        userInfo.setUserAvatar(res)
        popupWithAvatar.close() 
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => popupWithAvatar.changeButtonText('Сохранить'))
  }
 })

  popupWithAvatar.setEventListeners()


// открыть попап редактирования профиля

buttonOpenPopupEditProfile.addEventListener('click', () => { 
  popupWithProfile.open();
  popupWithProfile.changeButtonText('Сохранить');
  editPopupValidation.disableSubmitButton();
  editPopupValidation.resetValidation();
  const {name, about} = userInfo.getUserInfo();
  popupInputName.value = name;
  popupInputJob.value = about;
});


// открыть попап добавления карточки

buttonOpenPopupAddCard.addEventListener('click', function () { 
  popupWithCard.open();
  popupWithCard.changeButtonText('Создать');
  addPopupValidation.resetValidation();
  addPopupValidation.disableSubmitButton();
});




avatarOverlay.addEventListener('click', function() {
  popupWithAvatar.open()
  avatarPopupValidation.resetValidation();
  
  popupWithAvatar.changeButtonText('Сохранить')

})


// создание карточки и ее функции

function createCard (item) {
  const card = new Card(item, '#card-template', openPopupImage,  
  handleDeleteCard, handleClickLike, userId);

  const newCard = card.generateCard();
  return newCard;
}
  
function openPopupImage(name, link) {
  popupWithImage.open(name, link)
}


function handleDeleteCard(card, cardId) {
  popupConfirm.open(card, cardId)
}


function handleClickLike(card) { 
  if (card.isCardLiked) {
    api.deleteLike(card._cardId)
      .then((res) => {
        card.setLikes(res.likes)
        card.toggleIsLiked()
      })
      .catch((err) => {
        console.log(err);
      })
  } else {
    api.putLike(card._cardId)
      .then((res) => {
        card.setLikes(res.likes);
        card.toggleIsLiked()
      })
      .catch(err => {
        console.log(err)
      })
  }
}



