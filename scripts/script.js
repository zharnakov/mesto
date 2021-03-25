let popup = document.querySelector('.popup');
let openPopupBtn = document.getElementById('open_popup_btn');
let closePopupBtn = document.getElementById('close_popup_btn');
let closePopupBtnSave = document.querySelector('Form-edit-profile__button');
let nameResearcher = document.querySelector('.researcher__title');
let occupationResearcher = document.querySelector('.researcher__profile-text-discription');
let nameForm = document.querySelector('input[name="name"]');
let occupationForm = document.querySelector('input[name="occupation"]');
let formElement = document.querySelector('form');

function openPopup() {
    popup.classList.add('popup_opened');
    nameForm.value = nameResearcher.textContent;
    occupationForm.value = occupationResearcher.textContent;
}
openPopupBtn.addEventListener('click', openPopup);


function closePopup() {
    popup.classList.remove('popup_opened');
}
closePopupBtn.addEventListener('click', closePopup);


function closePopupSave(evt) {
    evt.preventDefault();
    closePopup();
    occupationResearcher.textContent = occupationForm.value;
    nameResearcher.textContent = nameForm.value;
}

formElement.addEventListener('submit', closePopupSave);