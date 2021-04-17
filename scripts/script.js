const popup = document.getElementById('editProfile');
const openPopupBtn = document.getElementById('open_popup_btn');
const closePopupBtn = document.querySelector('.popup__container-close');
const page = document.querySelector('.page');
const closePopupBtnSave = document.querySelector('form__submit-button');
const nameResearcher = document.querySelector('.researcher__title');
const occupationResearcher = document.querySelector('.researcher__profile-text-discription');

const cardTemplate = document.querySelector('#cardTemplate').content;
// //объявляем переменную карточки 

const formElement = document.querySelector('form');
const formInput = formElement.querySelector('.form__input');
const nameForm = document.querySelector('input[name="name"]');
const occupationForm = document.querySelector('input[name="occupation"]');

const openPopupCard = document.getElementById('open_popup_addcards');
const openPopupAddCard = document.getElementById('addCard');
const closePopupCard = document.getElementById('close_popup');
// попап картинки
const openPic = document.getElementById('openPic');
const pic = document.querySelector('.open-pic');
const closePopupPhoto = document.getElementById('close_popup-pic');
const photoText = document.querySelector('.open-pic-text');

const formCard = document.querySelector('form[name="cardForm"]');
const titleImage = document.querySelector('input[name="titleImage"]');
const linkImage = document.querySelector('input[name="linkImage"]');

const photoGrid = document.querySelector('.photo-grid');


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
    if (evt.keyCode === 27) {
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

const disableButton = (formElement) => {
    const submitButton = formElement.querySelector('.form__submit-button');
    submitButton.classList.add('form__submit_inactive');
    submitButton.setAttribute("disabled", "disabled");
}

//Открытие попапа добавления карточки
openPopupCard.addEventListener('click', function() {
    formCard.reset();
    openModal(openPopupAddCard);
    disableButton(formCard);
});

//Закрытие попапа после добавления карточки
closePopupCard.addEventListener('click', () => {
    closeModal(openPopupAddCard);
});

// Закрытие попапа после добавления карточки "Создать"
function closePopupCardSave(evt) {
    evt.preventDefault();
    photoGrid.prepend(addCard(titleImage.value, linkImage.value));
    closeModal(openPopupAddCard);
}
formCard.addEventListener('submit', closePopupCardSave);


//Открытие попапа редактирования профайла

openPopupBtn.addEventListener('click', function() {
    openModal(popup);
    nameForm.value = nameResearcher.textContent;
    occupationForm.value = occupationResearcher.textContent;
    disableButton(formElement);
});

//Закрытие попапа редактирования профайла
closePopupBtn.addEventListener('click', function() {
    closeModal(popup);
});

//Закрытие попапа редактирования профайла

function closePopupSave(evt) {
    evt.preventDefault();
    closeModal(popup);
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
    photoGrid.prepend(addCard(item.name, item.link));
})

function addCard(titleValue, linkValue) {
    const cardTemplate = document.querySelector('#cardTemplate').content;
    const cardElement = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);
    cardElement.querySelector('.photo-grid__item-info-title').textContent = titleValue;
    cardElement.querySelector('.photo-grid__item-image').src = linkValue;
    cardElement.querySelector('.photo-grid__item-image').alt = titleValue;

    const removeCard = cardElement.querySelector('.photo-grid__button');

    function deleteCard() {
        cardElement.remove();
    }
    removeCard.addEventListener('click', deleteCard);

    function openPopupPic() {
        pic.src = linkValue;
        pic.alt = titleValue;
        openModal(openPic);
        photoText.textContent = titleValue;

    }
    cardElement.querySelector('.photo-grid__item-image').addEventListener('click', openPopupPic);


    const buttonLike = cardElement.querySelector('.photo-grid__item-info-like');

    function like(evt) {
        evt.target.classList.toggle('photo-grid__item-info-like_active');
    }
    buttonLike.addEventListener('click', like);

    return cardElement;

}

//Закрытие попапа после добавления карточки

closePopupPhoto.addEventListener('click', function() {
    closeModal(openPic);
});