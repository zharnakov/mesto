import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
    constructor(selector) {
        super(selector);
        this._bindedListenerSubmit = this._listenerForSubmit.bind(this);
        this._form = this._modal.querySelector('.form');
    }
   
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._bindedListenerSubmit);
      }

    removeEventListener() {
      super.removeEventListener();
      this._form.removeEventListener('submit', this._bindedListenerSubmit);
    }

      _listenerForSubmit(evt) {
        evt.preventDefault();
        this._submitFunc()
      }

      setSubmitHandler(submitFunc) {
        this._submitFunc = submitFunc;
      }
}