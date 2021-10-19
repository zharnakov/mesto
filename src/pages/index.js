import {Card} from '../components/Card.js'; 
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';
import { initialCards, configObject } from '../utils/constants.js'

const photoGrid = document.querySelector('.photo-grid');

// попап редактирования профайла
const buttonOpenEditProfile = document.getElementById('open_popup_btn');
const formEditProfile = document.querySelector('form[name="editProfile"]');
const nameInput = document.querySelector('input[name="name"]');
const occupationInput = document.querySelector('input[name="occupation"]');

//  попап добавления карточки
const buttonAddCard = document.getElementById('open_popup_addcards');
const formAddCard = document.querySelector('form[name="cardForm"]');

const editProfilePopup = new PopupWithForm('#editProfile', handleSubmitFormEditProfile);
const addCardPopup = new PopupWithForm('#addCard', handleSubmitFormAddCard);
const picturePopup = new PopupWithImage('#openPic');

const getInfo = new UserInfo({
    selecrorName: '.researcher__title',
    selectorDescription: '.researcher__profile-text-discription'
});

function handleSubmitFormEditProfile(formValues) {
    getInfo.setUserInfo({
        name: formValues.name,
        occupation: formValues.occupation
    });
    editProfilePopup.close();
}

function handleSubmitFormAddCard(formValues) {
    const data = {
        name: formValues.titleImage, 
        link: formValues.linkImage 
    }
    cardList.addItem(createCard(data))
    addCardPopup.close();
}

//Обработка попапа добавления карточки

buttonAddCard.addEventListener('click', function() {
    addCardPopup.open();
    formAddCardValidation.disableButton();
    formAddCardValidation.cleanErrorMesages();
});

//Обработка попапа редактирования профайла

buttonOpenEditProfile.addEventListener('click', function() {
    editProfilePopup.open();
    const objectInfo = getInfo.getUserInfo();
    nameInput.value = objectInfo.name;
    occupationInput.value = objectInfo.occupation;
    formEditProfileValidation.disableButton();
    formEditProfileValidation.cleanErrorMesages();
});

function createCard(data) {
    const card = new Card (data, '#cardTemplate', handleCardClick);
    const cardElement = card.generateCard();
    return cardElement
}

function handleCardClick(image, title) {
    picturePopup.open(image, title);
}

const cardList = new Section ({
    items: initialCards, 
    renderer: (item) => {
        cardList.addItem(createCard(item))
    }
}, '.photo-grid');

cardList.renderItems();

const formAddCardValidation = new FormValidator (configObject, formAddCard);
const formEditProfileValidation = new FormValidator (configObject, formEditProfile);

formAddCardValidation.enableValidation();
formEditProfileValidation.enableValidation();

