import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';
import { configObject } from '../utils/constants.js'
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';

let cardList;

// попап редактирования профайла
const buttonOpenEditProfile = document.getElementById('open_popup_btn');
const formEditProfile = document.querySelector('form[name="editProfile"]');
const nameInput = document.querySelector('input[name="name"]');
const occupationInput = document.querySelector('input[name="occupation"]');

//  попап добавления карточки
const buttonAddCard = document.getElementById('open_popup_addcards');
const formAddCard = document.querySelector('form[name="cardForm"]');

const picturePopup = new PopupWithImage('#openPic');
const popupWithButton = new PopupWithSubmit('#deleteCard');
const formAddCardValidation = new FormValidator(configObject, formAddCard);
const formEditProfileValidation = new FormValidator(configObject, formEditProfile);

const getInfo = new UserInfo({
    selecrorName: '.researcher__title',
    selectorDescription: '.researcher__profile-text-discription',
    selectorAvatar: '.researcher__profile-image'
});

function handleCardClick(image, title) {
    picturePopup.open(image, title);
}

const api = new Api({
    url: "https://mesto.nomoreparties.co",
    headers: {
        Authorization: "49b668cb-f214-4312-b556-8e7c4d7fb9cc",
        "content-type": "application/json"
    }
})

Promise.all([api.getUserInfo(), api.getAllCards()])
    .then(([user, cards]) => {
        getInfo.setUserInfo({
            name: user.name,
            occupation: user.about,
        })
        getInfo.setUserAvatar(user.avatar)

        console.log(cards)

        cardList = new Section({
            items: cards,
            renderer: (item) => {
                cardList.addItem(createCard(item))
            }
        }, '.photo-grid');
        cardList.renderItems();

        formAddCardValidation.enableValidation();
        formEditProfileValidation.enableValidation();

        const editProfilePopup = new PopupWithForm('#editProfile', handleSubmitFormEditProfile);

        buttonOpenEditProfile.addEventListener('click', function () {
            editProfilePopup.open();
            const objectInfo = getInfo.getUserInfo();
            nameInput.value = objectInfo.name;
            occupationInput.value = objectInfo.occupation;
            formEditProfileValidation.disableButton();
            formEditProfileValidation.cleanErrorMesages();
        });

        function handleSubmitFormEditProfile(formValues) {
            const data = {
                name: formValues.name,
                about: formValues.occupation
            }
        
            api.changeUserInfo(data)
                .then((userObject) => {
                    getInfo.setUserInfo({
                        name: userObject.name,
                        occupation: userObject.about,
                    })
                    editProfilePopup.close()
                })
                .catch((err) => alert(err));
        }

        const addCardPopup = new PopupWithForm('#addCard', handleSubmitFormAddCard);

        buttonAddCard.addEventListener('click', function () {
            addCardPopup.open();
            formAddCardValidation.disableButton();
            formAddCardValidation.cleanErrorMesages();
        });

        function handleSubmitFormAddCard(formValues) {
            const data = {
                name: formValues.titleImage,
                link: formValues.linkImage
            }
            api.addCard(data)
                .then((objectCard) => {
                    cardList.addItem(createCard(objectCard))
                    addCardPopup.close()
                })
                .catch((err) => alert(err));
        }

        function createCard(data) {
            const card = new Card(data, '#cardTemplate', handleCardClick, handlePopupButton, user._id);
            const cardElement = card.generateCard();
            
            function handlePopupButton(idCard) {
                popupWithButton.open();
                popupWithButton.setEventListeners();
                popupWithButton.setSubmitHandler(() => {
                    api.deleteCard(idCard)
                    .then(() => {
                        popupWithButton.close();
                        card.removeCard();
                    })
                    .catch((err) => alert(err));
                })
            }
    
            return cardElement
        }

        

    })
    .catch((err) => alert(err));



