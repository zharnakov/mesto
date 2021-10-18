import Popup from "./Popup.js";
const openedPicture = document.querySelector('.open-pic');
const openedPictureLabel = document.querySelector('.open-pic-text');


export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }

    open(image, title) {
        super.open();
        openedPicture.src = image;
        openedPicture.alt = title;
        openedPictureLabel.textContent = title;
    }

}

