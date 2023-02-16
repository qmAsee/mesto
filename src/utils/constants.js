// КОНСТАНТЫ ПРОФИЛЯ 

  // Кнопки редактирования профиля и добавления новой карточки
 export const buttonOpenPopupEditProfile = document.querySelector('.profile__edit'); //редактировать профиль
 export const buttonOpenPopupAddCard = document.querySelector('.profile__add'); // добавить карточку
  
    // Имя и профессия
 export  const profileName = document.querySelector('.profile__name'); // имя
 export const profileJob = document.querySelector('.profile__description'); // работа
  //--------------------------------------------------------------------------
  
  //КОНСТАНТЫ ПОПАПОВ
  
    // Селекторы попапов
 //export const popupTypeEdit = document.querySelector('.popup_type_edit'); // попап редактирования профиля
 //export const popupTypeAdd = document.querySelector('.popup_type_add'); // попап добавления карточки
 //export const popupTypePic = document.querySelector('.popup_type_pic'); // попап с картинкой
  
    // Селекторы форм 
 export const popupFormEdit = document.querySelector('.popup__form_edit'); // форма редактирования профиля
 export const popupFormAdd = document.querySelector('.popup__form_add'); // форма добавления карточки
  
    // Инпуты
 export const popupInputName = document.querySelector('.popup__input_type_name'); // инпут имя
 export const popupInputJob = document.querySelector('.popup__input_type_profession'); // инпут работа
  
  
  // ПРОЧЕЕ
 export const cardsContainer = document.querySelector('.elements'); // селектор контейнера карточек
  
 export const initialCards = [ // карточки 
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