let editProfile = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let popupBody = document.querySelector('.popup__body');
let popupName = document.querySelector('.popup__form_name');
let popupProfession = document.querySelector('.popup__form_profession');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__description');
let editSave = document.querySelector('.popup__content');

function openPopup() {
  popup.classList.add('popup_opened');
  popupName.value = profileName.innerText;
  popupProfession.value = profileProfession.innerText;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

popup.addEventListener('click', function(event) {
  if(event.target == popupBody) {
    closePopup();
  }
});

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = popupName.value;
  profileProfession.textContent = popupProfession.value;
  closePopup();
}

editSave.addEventListener('submit', handleFormSubmit);
editProfile.addEventListener('click', openPopup);
popupClose.addEventListener('click', closePopup);


