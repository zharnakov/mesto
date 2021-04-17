// добавьте класс ошибки элементу input
const showInputError = (formElement, inputElement, errorMessage, configObject) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(configObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(configObject.errorClass);
};

// удаляем класс ошибки input
const hideInputError = (formElement, inputElement, configObject) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(configObject.inputErrorClass);
    errorElement.classList.remove(configObject.errorClass);
    errorElement.textContent = '';
};


const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, configObject) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(configObject.inactiveButtonClass);
        buttonElement.setAttribute("disabled", "disabled");
    } else {
        buttonElement.classList.remove(configObject.inactiveButtonClass);
        buttonElement.removeAttribute("disabled", "disabled");
    }
}

const checkInputValidity = (formElement, inputElement, configObject) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, configObject);
    } else {
        hideInputError(formElement, inputElement, configObject);
    }
};

const setEventListeners = (formElement, configObject) => {
    const inputList = Array.from(formElement.querySelectorAll(configObject.inputSelector));
    const buttonElement = formElement.querySelector(configObject.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, configObject);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement, configObject);
            toggleButtonState(inputList, buttonElement, configObject);
        });
    });
}

const enableValidation = (configObject) => {
    const formList = Array.from(document.querySelectorAll(configObject.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, configObject);
    });
};

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-button',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
});