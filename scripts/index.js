import {Card} from '../components/Card.js'; 
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';

const photoGrid = document.querySelector('.photo-grid');
const researcherName = document.querySelector('.researcher__title');
const researcherOccupation = document.querySelector('.researcher__profile-text-discription');

// попап редактирования профайла
const buttonOpenEditProfile = document.getElementById('open_popup_btn');
const formEditProfile = document.querySelector('form[name="editProfile"]');
const nameInput = document.querySelector('input[name="name"]');
const occupationInput = document.querySelector('input[name="occupation"]');

//  попап добавления карточки
const buttonAddCard = document.getElementById('open_popup_addcards');
const formAddCard = document.querySelector('form[name="cardForm"]');
const titleImageInput = document.querySelector('input[name="titleImage"]');
const linkImageInput = document.querySelector('input[name="linkImage"]');

const editProfilePopup = new Popup('#editProfile');
const addCardPopup = new Popup('#addCard');
const picturePopup = new PopupWithImage('#openPic');

//Обработка попапа добавления карточки

buttonAddCard.addEventListener('click', function() {
    formAddCard.reset();
    addCardPopup.open();
    formAddCardValidation.disableButton();
    formAddCardValidation.cleanErrorMesages();
});

function handleSubmitFormAddCard(evt) {
    evt.preventDefault();
    const data = {
        name: titleImageInput.value, 
        link: linkImageInput.value 
    }
    photoGrid.prepend(createCard(data))
    addCardPopup.close();
}

formAddCard.addEventListener('submit', handleSubmitFormAddCard);


//Обработка попапа редактирования профайла

buttonOpenEditProfile.addEventListener('click', function() {
    editProfilePopup.open();
    nameInput.value = researcherName.textContent;
    occupationInput.value = researcherOccupation.textContent;
    formEditProfileValidation.disableButton();
    formEditProfileValidation.cleanErrorMesages();
});

function handleSubmitFormEditProfile(evt) {
    evt.preventDefault();
    editProfilePopup.close();
    researcherOccupation.textContent = occupationInput.value;
    researcherName.textContent = nameInput.value;
}
formEditProfile.addEventListener('submit', handleSubmitFormEditProfile);

const initialCards = [{
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

function handleCardClick(image, title) {
    picturePopup.open(image, title);
}



const cardList = new Section ({
    items: initialCards, 
    renderer: (item) => {
        const card = new Card (item, '#cardTemplate', handleCardClick);
        const cardElement = card.generateCard();
        cardList.addItem(cardElement)
    }
}, '.photo-grid');

cardList.renderItems();


const configObject = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};

const formAddCardValidation = new FormValidator (configObject, formAddCard);
const formEditProfileValidation = new FormValidator (configObject, formEditProfile);

formAddCardValidation.enableValidation();
formEditProfileValidation.enableValidation();

