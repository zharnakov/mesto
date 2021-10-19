import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        this._openedPicture = this._modal.querySelector('.open-pic');
        this._openedPictureLabel = this._modal.querySelector('.open-pic-text');

    }

    open(image, title) {
        super.open();
        this._openedPicture.src = image;
        this._openedPicture.alt = title;
        this._openedPictureLabel.textContent = title;
    }

}

