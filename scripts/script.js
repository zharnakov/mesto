import {Card} from './Card'; 

const page = document.querySelector('.page');
const photoGrid = document.querySelector('.photo-grid');
const cardTemplate = document.querySelector('#cardTemplate').content;
const researcherName = document.querySelector('.researcher__title');
const researcherOccupation = document.querySelector('.researcher__profile-text-discription');

// попап редактирования профайла
const popupEditProfile = document.getElementById('editProfile');
const buttonOpenEditProfile = document.getElementById('open_popup_btn');
const crossButtonEditProfile = document.querySelector('.popup__container-close');
const formEditProfile = document.querySelector('form[name="editProfile"]');
const nameInput = document.querySelector('input[name="name"]');
const occupationInput = document.querySelector('input[name="occupation"]');

//  попап добавления карточки
const buttonAddCard = document.getElementById('open_popup_addcards');
const popupAddCard = document.getElementById('addCard');
const crossButtonAddCard = document.getElementById('close_popup');
const formAddCard = document.querySelector('form[name="cardForm"]');
const titleImageInput = document.querySelector('input[name="titleImage"]');
const linkImageInput = document.querySelector('input[name="linkImage"]');

// попап картинки
const picturePopup = document.getElementById('openPic');
const crossButtonPicturePopup = document.getElementById('close_popup-pic');
const openedPicture = document.querySelector('.open-pic');
const openedPictureLabel = document.querySelector('.open-pic-text');

const escKeyCode = 27;

function openModal(modal) {
    modal.classList.add('popup_opened');
    page.addEventListener('keyup', handleEscKeyup);
    modal.addEventListener('click', handleOverlayClick);
}

function closeModal(modal) {
    modal.classList.remove('popup_opened');
    page.removeEventListener('keyup', handleEscKeyup);
    modal.removeEventListener('click', handleOverlayClick);
}

function handleEscKeyup(evt) {
    if (evt.keyCode === escKeyCode) {
        const activeModal = page.querySelector('.popup_opened');
        closeModal(activeModal);
    }
}

function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
        const activeModal = page.querySelector('.popup_opened');
        closeModal(activeModal);
    }
}

const disableButton = (genericForm) => {
    const submitButton = genericForm.querySelector('.form__submit-button');
    submitButton.classList.add('form__submit_inactive');
    submitButton.setAttribute("disabled", "disabled");
}

//Обработка попапа добавления карточки

buttonAddCard.addEventListener('click', function() {
    formAddCard.reset();
    openModal(popupAddCard);
    disableButton(formAddCard);
});

crossButtonAddCard.addEventListener('click', () => {
    closeModal(popupAddCard);
});

function handleSubmitFormAddCard(evt) {
    evt.preventDefault();
    photoGrid.prepend(addCard(titleImageInput.value, linkImageInput.value));
    closeModal(popupAddCard);
}
formAddCard.addEventListener('submit', handleSubmitFormAddCard);


//Обработка попапа редактирования профайла

buttonOpenEditProfile.addEventListener('click', function() {
    openModal(popupEditProfile);
    nameInput.value = researcherName.textContent;
    occupationInput.value = researcherOccupation.textContent;
    disableButton(formEditProfile);
});

crossButtonEditProfile.addEventListener('click', function() {
    closeModal(popupEditProfile);
});

function handleSubmitFormEditProfile(evt) {
    evt.preventDefault();
    closeModal(popupEditProfile);
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

// initialCards.forEach(function(item) {
//     photoGrid.prepend(addCard(item.name, item.link));
// })

initialCards.forEach(function(item) {
        const card = new Card (item, '#cardTemplate')
    })

// закртыие попапа с элементом в отдельном окне
crossButtonPicturePopup.addEventListener('click', function() {
    closeModal(picturePopup);
});

export {openModal};