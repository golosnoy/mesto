export class FormValidator {
  constructor(config) {
    this.form = config.formSelector,
    this.input = config.inputSelector,
    this.submitButton = config.submitButtonSelector,
    this.inputError = config.inputErrorSelector,
    this.inactiveButtonClass = config.inactiveButtonClass,
    this.inputErrorClass = config.inputErrorClass,
    this.spanErrorClass = config.spanErrorClass
    this.formList = Array.from(document.querySelectorAll(this.form));

  }

  _setEventListeners(inputElement, inputList, buttonElement, errorElement) {
    inputElement.addEventListener("input", () => {
        this._isValid(inputElement, errorElement);
        this._toggleButtonState(inputList, buttonElement);
  });
  };

  _isValid(inputElement, errorElement) {
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement, errorElement, inputElement.validationMessage);
    } else {
        this._hideInputError(inputElement, errorElement);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
  };

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
        buttonElement.classList.add(this.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(this.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
  };

  _showInputError(inputElement, errorElement, errorMessage) {
      inputElement.classList.add(this.inputErrorClass);
      errorElement.classList.add(this.spanErrorClass);
      errorElement.textContent = errorMessage;
  };

  _hideInputError(inputElement, errorElement) {
      inputElement.classList.remove(this.inputErrorClass);
      errorElement.classList.remove(this.spanErrorClass);
      errorElement.textContent = "";
  };

  enableValidation() {
    this.formList.forEach((formElement) => {
        const inputList = Array.from(formElement.querySelectorAll(this.input));
        const buttonElement = formElement.querySelector(this.submitButton);
        inputList.forEach((inputElement) => {
          const errorElement = formElement.querySelector(`${this.inputError}_${inputElement.id}`);
          this._setEventListeners(inputElement, inputList, buttonElement, errorElement);
          });
    });
  };

}
