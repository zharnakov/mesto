import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor (selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._modal.querySelector('.form');
        this._bindedListener = this._listenerForSubmit.bind(this);
        this._inputList = this._form.querySelectorAll('.form__input');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        
        return this._formValues;
      }

      _listenerForSubmit(evt) {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues())
      }

    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', this._bindedListener);
    }

    removeEventListener() {
        super.removeEventListener();
        this._form.removeEventListener('submit', this._bindedListener);
    }

    close() {
        super.close();
        this._form.reset();
    }
}