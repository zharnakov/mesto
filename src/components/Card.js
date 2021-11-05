class Card {

    constructor (data, cardSelector, handleCardClick, handlePopupButton, userId) {
        this._cardSelector = cardSelector;
        this._card = data;
        this._userId = userId;
        this._handleCardClick = handleCardClick;
        this._handlePopupButton = handlePopupButton;
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
    this._counter = this._element.querySelector('.photo-grid__item-info-counter');
    this._counter.textContent = this._card.likes.length
    this._element.querySelector('.photo-grid__item-info-title').textContent = this._card.name;
    this._picItem.src = this._card.link;
    this._picItem.alt = this._card.name;
    this._buttonRemoveCard = this._element.querySelector('.photo-grid__button');
    if (this._userId !== this._card.owner._id) {
        this._buttonRemoveCard.classList.add('photo-grid__button-hidden')
    }
    this._likeButton = this._element.querySelector('.photo-grid__item-info-like');

    this._setEventListeners();

    return this._element
}

_setEventListeners() {

    this._picItem.addEventListener('click', () => {
        this._openPicturePopup();
      });

      this._buttonRemoveCard.addEventListener('click', () => {
        this._openPopupWithButton();

      });

      this._likeButton.addEventListener('click', this._handleLikeClick);
}

removeCard() {
    this._element.remove()
}

_openPopupWithButton() {
    this._handlePopupButton(this._card._id);
}

_openPicturePopup() {
    this._handleCardClick(this._card.link, this._card.name);
}

_handleLikeClick (evt) {
    evt.target.classList.toggle('photo-grid__item-info-like_active');
} 

}

export { Card };