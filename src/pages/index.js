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


const buttonOpenEditProfile = document.getElementById('open_popup_btn');
const formEditProfile = document.querySelector('form[name="editProfile"]');
const nameInput = document.querySelector('input[name="name"]');
const occupationInput = document.querySelector('input[name="occupation"]');
const avatar = document.querySelector('.researcher__profile-image-add');
const formUpdateAvatar = document.querySelector('form[name="updateAvatar"]');
const buttonAddCard = document.getElementById('open_popup_addcards');
const formAddCard = document.querySelector('form[name="cardForm"]');

const picturePopup = new PopupWithImage('#openPic');
const popupWithButton = new PopupWithSubmit('#deleteCard');
const formAddCardValidation = new FormValidator(configObject, formAddCard);
const formEditProfileValidation = new FormValidator(configObject, formEditProfile);
const updateAvatarFormValidation = new FormValidator(configObject, formUpdateAvatar);

const getInfo = new UserInfo({
    selecrorName: '.researcher__title',
    selectorDescription: '.researcher__profile-text-discription',
    selectorAvatar: '.researcher__profile-image'
});

const api = new Api({
    url: "https://mesto.nomoreparties.co/v1/cohort-29",
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

        cardList = new Section({
            items: cards,
            renderer: (item) => {
                cardList.addItem(createCard(item))
            }
        }, '.photo-grid');
        cardList.renderItems();

        formAddCardValidation.enableValidation();
        formEditProfileValidation.enableValidation();
        updateAvatarFormValidation.enableValidation();

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

            editProfilePopup.renderLoading(true)
            api.changeUserInfo(data)
                .then((userObject) => {
                    getInfo.setUserInfo({
                        name: userObject.name,
                        occupation: userObject.about,
                    })
                    editProfilePopup.close()
                })
                .catch((err) => alert(err))
                .finally(() => editProfilePopup.renderLoading(false))
            
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
            addCardPopup.renderLoading(true)
            api.addCard(data)
                .then((objectCard) => {
                    cardList.addItem(createCard(objectCard))
                    addCardPopup.close()
                })
                .catch((err) => alert(err))
                .finally(() => addCardPopup.renderLoading(false))
        }

        const updateAvatar = new PopupWithForm('#updateAvatar', handleSubmitFormUpdateAvatar);

        avatar.addEventListener('click', function () {
            updateAvatar.open();
            updateAvatarFormValidation.disableButton();
            updateAvatarFormValidation.cleanErrorMesages();
        });

        function handleSubmitFormUpdateAvatar(formValues) {
            const data = {
                avatar: formValues.avatarLink
            }

            updateAvatar.renderLoading(true)
            api.changeUserPhoto(data)
                .then((objectUser) => {
                    getInfo.setUserAvatar(objectUser.avatar)
                    updateAvatar.close();
                })
                .catch((err) => alert(err))
                .finally(() => updateAvatar.renderLoading(false));
        }

        function createCard(data) {
            const card = new Card(data, '#cardTemplate', handleCardClick, handlePopupButton, user._id, likeHandler);
            const cardElement = card.generateCard();

            function handleCardClick(image, title) {
                picturePopup.open(image, title);
            }

            function handlePopupButton(idCard) {
                popupWithButton.open();
                popupWithButton.setSubmitHandler(() => {
                    api.deleteCard(idCard)
                        .then(() => {
                            popupWithButton.close();
                            card.removeCard();
                        })
                        .catch((err) => alert(err));
                })
            }

            function likeHandler() {
                api.changeLikeCardStatus(data._id, card.isLiked())
                    .then((objectCard) => {
                        card.updateCard(objectCard);
                    })
                    .catch((err) => alert(err));
            }

            return cardElement
        }
    })
    .catch((err) => alert(err));



