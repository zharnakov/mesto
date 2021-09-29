class Card {
    constructor (data, cardSelector) {
        this.cardSelector = cardSelector;
    }

_getTemplate() {
    const cardElement = document
    .querySelector(this.cardSelector)
    .content
    .querySelector('.photo-grid__item')
    .cloneNode(true);

    return cardElement;
}

generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.photo-grid__item-info-title').textContent = data.titleValue;
    this._element.querySelector('.photo-grid__item-image').src = data.linkValue;
    this._element.querySelector('.photo-grid__item-image').alt = data.titleValue;

    return this._element
}

_removeCard() {
    this._card =  this.generateCard();
    this._card.remove()
}

// дополнительный попап при клике на элемент 
_openPicturePopup() {
    const picturePopup = document.getElementById('openPic');
    picturePopup.src = data.linkValue;
    openedPicture.alt = titleValue;

    const crossButtonPicturePopup = document.getElementById('close_popup-pic');
    const openedPicture = document.querySelector('.open-pic');
    openedPictureLabel = document.querySelector('.open-pic-text');
    
}

_buttonRemove() {
    const buttonRemoveCard = cardElement.querySelector('.photo-grid__button');
}

}