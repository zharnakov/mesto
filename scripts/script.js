let popup = document.getElementById('editProfile');
let openPopupBtn = document.getElementById('open_popup_btn');
let closePopupBtn = document.getElementById('close_popup_btn');
let closePopupBtnSave = document.querySelector('form__submit-button');
let nameResearcher = document.querySelector('.researcher__title');
let occupationResearcher = document.querySelector('.researcher__profile-text-discription');
let nameForm = document.querySelector('input[name="name"]');
let occupationForm = document.querySelector('input[name="occupation"]');
let formElement = document.querySelector('form');
let openPopupAddCard = document.getElementById('addCard');
const photoGgrid = document.querySelector('.photo-grid');

//Открытие попапа редактирования профайла
function openPopup() {
    popup.classList.add('popup_opened');
    nameForm.value = nameResearcher.textContent;
    occupationForm.value = occupationResearcher.textContent;
}
openPopupBtn.addEventListener('click', openPopup);

//Закрытие попапа редактирования профайла
function closePopup() {
    popup.classList.remove('popup_opened');
}
closePopupBtn.addEventListener('click', closePopup);

//Закрытие попапа редактирования профайла на крестик
function closePopupSave(evt) {
    evt.preventDefault();
    closePopup();
    occupationResearcher.textContent = occupationForm.value;
    nameResearcher.textContent = nameForm.value;
}
formElement.addEventListener('submit', closePopupSave);





//Открытие попапа добавления карточки
function openPopup() {
  popup.classList.add('popup_opened');
  nameForm.value = nameResearcher.textContent;
  occupationForm.value = occupationResearcher.textContent;
}
openPopupBtn.addEventListener('click', openPopup);

//Закрытие попапа добавления карточки
function closePopup() {
  popup.classList.remove('popup_opened');
}
closePopupBtn.addEventListener('click', closePopup);

//Закрытие попапа добавления карточки на крестик
function closePopupSave(evt) {
  evt.preventDefault();
  closePopup();
  occupationResearcher.textContent = occupationForm.value;
  nameResearcher.textContent = nameForm.value;
}
formElement.addEventListener('submit', closePopupSave);




















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


  initialCards.forEach(function(item) {
      addCard(item.name, item.link);      
})




function addCard(titleValue, linkValue) {
    const cardTemplate = document.querySelector('#cardTemplate').content;
    const cardElement = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);

    cardElement.querySelector('.photo-grid__item-info-title').textContent = titleValue;
    cardElement.querySelector('.photo-grid__item-image').src = linkValue;
    cardElement.querySelector('.photo-grid__item-image').alt = titleValue;
    
    photoGgrid.prepend(cardElement);
 
  }
