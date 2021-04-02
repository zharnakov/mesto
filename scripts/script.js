let popup = document.getElementById('redactionProfile');
let openPopupBtn = document.getElementById('open_popup_btn');
let closePopupBtn = document.querySelector('.popup__container-close');
let closePopupBtnSave = document.querySelector('form__submit-button');
let nameResearcher = document.querySelector('.researcher__title');
let occupationResearcher = document.querySelector('.researcher__profile-text-discription');

const cardTemplate = document.querySelector('#cardTemplate').content;
let removeCard = cardTemplate.getElementById('removeCard');

let formElement = document.querySelector('form');
let nameForm = document.querySelector('input[name="name"]');
let occupationForm = document.querySelector('input[name="occupation"]');

let openPopupCard = document.getElementById('open_popup_addcards');
let openPopupAddCard = document.getElementById('addCard');
let closePopupCard = document.getElementById('close_popup');
let formCard = document.querySelector('form[name="cardForm"]');
let titleImage = document.querySelector('input[name="titleImage"]');
let linkImage = document.querySelector('input[name="linkImage"]');

const photoGgrid = document.querySelector('.photo-grid');

// // // удаление карточки грида
function deleteCard() {
    addCard.shift();
}
removeCard.addEventListener('click', deleteCard);

//Открытие попапа добавления карточки
function openPopupEditCard() {
    openPopupAddCard.classList.add('popup_opened');
}
openPopupCard.addEventListener('click', openPopupEditCard);

//Закрытие попапа добавления карточки
function closePopupEditCard() {
    openPopupAddCard.classList.remove('popup_opened');
}
closePopupCard.addEventListener('click', closePopupEditCard);

// Закрытие попапа после добавления карточки на крестик
function closePopupCardSave(evt) {
    evt.preventDefault();
    closePopupEditCard();
    addCard(titleImage.value, linkImage.value);
}
formCard.addEventListener('submit', closePopupCardSave);


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


initialCards.forEach(function(item) {
    addCard(item.name, item.link);
})

function addCard(titleValue, linkValue) {
    const cardElement = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);

    cardElement.querySelector('.photo-grid__item-info-title').textContent = titleValue;
    cardElement.querySelector('.photo-grid__item-image').src = linkValue;
    cardElement.querySelector('.photo-grid__item-image').alt = titleValue;

    photoGgrid.prepend(cardElement);
}