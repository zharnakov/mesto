class FormValidator {
    constructor (configObject, formElement) {
        this._configObject = configObject;
        this._formElement = formElement;
        this._inputListArray = Array.from(this._formElement.querySelectorAll(this._configObject.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._configObject.submitButtonSelector);

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

    _toggleButtonState () {
        if (this._hasInvalidInput(this._inputListArray)) {
            this.disableButton()
        } else {
            this._buttonElement.classList.remove(this._configObject.inactiveButtonClass);
            this._buttonElement.removeAttribute("disabled", "disabled");
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
        this._toggleButtonState();
    
        this._inputListArray.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
      this._setEventListeners();
    }

    disableButton() {
        this._buttonElement.setAttribute("disabled", "disabled");
        this._buttonElement.classList.add(this._configObject.inactiveButtonClass);
    }

    cleanErrorMesages() {
        this._inputListArray.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }
}

export {FormValidator};


