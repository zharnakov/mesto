const page = document.querySelector('.page');
const escKeyCode = 27;

export default class Popup {
    constructor(selector) {
        this._modal = document.querySelector(selector);
        this._crossButton = this._modal.querySelector('.popup__container-close');
        this._bindedListenerOverlay = this._handleOverlayClick.bind(this);
        this._bindedListenerEsc = this._handleEscClose.bind(this);
    }

    open() {
        this._modal.classList.add('popup_opened');
        this.setEventListeners();
    }

    close() {
        this._modal.classList.remove('popup_opened');
        this.removeEventListener();
    }

    _handleEscClose(evt) {
        if (evt.keyCode === escKeyCode) {
            this.close();
        }
    }

    _handleOverlayClick(evt) {
        if (evt.target === evt.currentTarget) {
            this.close();
        }
    }

    setEventListeners() {
        page.addEventListener('keyup', this._bindedListenerEsc);
        this._modal.addEventListener('click', this._bindedListenerOverlay);
        
        this._crossButton.addEventListener('click', () => {
            this.close();
        });
    }

    removeEventListener() {
        page.removeEventListener('keyup', this._bindedListenerEsc);
        this._modal.removeEventListener('click', this._bindedListenerOverlay);
    }
}
