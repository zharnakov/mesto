const openedPicture = document.querySelector('.open-pic');
const openedPictureLabel = document.querySelector('.open-pic-text');
const picturePopup = document.getElementById('openPic');


class Card {

    constructor (data, cardSelector, handleCardClick) {
        this._cardSelector = cardSelector;
        this._title = data.name;
        this._image = data.link;
        this._handleCardClick = handleCardClick;
    }

_getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.photo-grid__item')
    .cloneNode(true);

    return cardElement;
}

generateCard() {
    this._element = this._getTemplate();
    this._picItem = this._element.querySelector('.photo-grid__item-image');
    this._element.querySelector('.photo-grid__item-info-title').textContent = this._title;
    this._picItem.src = this._image;
    this._picItem.alt = this._title;
    this._buttonRemoveCard = this._element.querySelector('.photo-grid__button');
    this._likeButton = this._element.querySelector('.photo-grid__item-info-like');

    this._setEventListeners();

    return this._element
}

_setEventListeners() {

    this._picItem.addEventListener('click', () => {
        this._openPicturePopup();
      });

      this._buttonRemoveCard.addEventListener('click', () => {
        this._handleRemoveCard();
      });

      this._likeButton.addEventListener('click', this._handleLikeClick);
}

_handleRemoveCard() {
    this._element.remove()
}

// дополнительный попап при клике на элемент 
_openPicturePopup() {
    openedPicture.src = this._image;
    openedPicture.alt = this._title;
    openedPictureLabel.textContent = this._title;
    this._handleCardClick();
}

_handleLikeClick (evt) {
    evt.target.classList.toggle('photo-grid__item-info-like_active');
} 

}

export {Card};