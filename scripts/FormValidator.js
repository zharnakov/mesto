class FormValidator {
    constructor (configObject, formElement) {
        this._configObject = configObject;
        this._formElement = formElement;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._configObject.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._configObject.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._configObject.inputErrorClass);
        errorElement.classList.remove(this._configObject.errorClass);
        errorElement.textContent = '';
    }

    _hasInvalidInput (inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }

    _toggleButtonState (inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._configObject.inactiveButtonClass);
            buttonElement.setAttribute("disabled", "disabled");
        } else {
            buttonElement.classList.remove(this._configObject.inactiveButtonClass);
            buttonElement.removeAttribute("disabled", "disabled");
        }
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }

    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._configObject.inputSelector));
        const buttonElement = this._formElement.querySelector(this._configObject.submitButtonSelector);
    
        this._toggleButtonState(inputList, buttonElement);
    
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    }

    enableValidation() {
      this._setEventListeners();
    }

    disableButton() {
        const buttonElement = this._formElement.querySelector(this._configObject.submitButtonSelector);
        buttonElement.setAttribute("disabled", "disabled");
        buttonElement.classList.add(this._configObject.inactiveButtonClass);
    }

    cleanErrorMesages() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._configObject.inputSelector));
        inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }



}

export {FormValidator};


