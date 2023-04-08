const showInputError = (inputElement, errorElement, errorMessage) => {
    inputElement.classList.add("popup__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input-error_active");
};

const hideInputError = (inputElement, errorElement) => {
    inputElement.classList.remove("popup__input_type_error");
    errorElement.classList.remove("popup__input-error_active");
    errorElement.textContent = "";
};

const isValid = (inputElement, errorElement) => {
    if (!inputElement.validity.valid) {
        showInputError(inputElement, errorElement, inputElement.validationMessage);
    } else {
        hideInputError(inputElement, errorElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add("popup__submit-button_inactive");
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove("popup__submit-button_inactive");
        buttonElement.removeAttribute('disabled');
    }
};

const setEventListeners = (inputElement, inputList, buttonElement, errorElement) => {
        inputElement.addEventListener("input", () => {
            isValid(inputElement, errorElement);
            toggleButtonState(inputList, buttonElement);
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".popup__form"));
    formList.forEach((formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
        const buttonElement = formElement.querySelector(".popup__submit-button");
        inputList.forEach((inputElement) => {
          const errorElement = formElement.querySelector(`.popup__input-error_${inputElement.id}`);
          setEventListeners(inputElement, inputList, buttonElement, errorElement);
          });
    });
};

enableValidation();
