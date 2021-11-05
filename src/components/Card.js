class Card {

    constructor(data, cardSelector, handleCardClick, handlePopupButton, userId, likeHandler) {
        this._cardSelector = cardSelector;
        this._card = data;
        this._userId = userId;
        this._handleCardClick = handleCardClick;
        this._handlePopupButton = handlePopupButton;
        this._likeHandler = likeHandler;
        this._bindedHandleLikeClick = this._handleLikeClick.bind(this);
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
        this._likeButton = this._element.querySelector('.photo-grid__item-info-like');
        this._counter = this._element.querySelector('.photo-grid__item-info-counter');
        this._counter.textContent = this._card.likes.length
        this._element.querySelector('.photo-grid__item-info-title').textContent = this._card.name;
        this._picItem.src = this._card.link;
        this._picItem.alt = this._card.name;
        this._buttonRemoveCard = this._element.querySelector('.photo-grid__button');
        if (this._userId !== this._card.owner._id) {
            this._buttonRemoveCard.classList.add('photo-grid__button-hidden')
        }
        this._setEventListeners();
        this._impositionClassesLike();

        return this._element
    }

    isLiked() {
        return Boolean(this._card.likes.find(item => item._id === this._userId))
    }

    _setEventListeners() {

        this._picItem.addEventListener('click', () => {
            this._openPicturePopup();
        });

        this._buttonRemoveCard.addEventListener('click', () => {
            this._openPopupWithButton();

        });

        this._likeButton.addEventListener('click', this._bindedHandleLikeClick);
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

    _handleLikeClick(evt) {
        this._likeHandler();
    }

    updateCard(updatedCard) {
        this._card = updatedCard
        this._impositionClassesLike();
    }

    _impositionClassesLike() {
        if (this.isLiked()) {
            this._likeButton.classList.add('photo-grid__item-info-like_active')
        } else {
            this._likeButton.classList.remove('photo-grid__item-info-like_active')
        }

        this._counter.textContent = this._card.likes.length

    }

}
export { Card };