export class FormValidator {
  constructor(config, form) {
    this.form = form,
    this.input = config.inputSelector,
    this.submitButton = config.submitButtonSelector,
    this.inputError = config.inputErrorSelector,
    this.inactiveButtonClass = config.inactiveButtonClass,
    this.inputErrorClass = config.inputErrorClass,
    this.spanErrorClass = config.spanErrorClass
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

  activateButton(buttonElement) {
    buttonElement.classList.add(this.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  };

  inactivateButton(buttonElement) {
    buttonElement.classList.remove(this.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  };

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
        this.activateButton(buttonElement);
    } else {
        this.inactivateButton(buttonElement);
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

  clearErrors() {
    const errorList = Array.from(this.form.querySelectorAll(this.inputError));
      errorList.forEach((errorElement) => {
          errorElement.classList.remove(this.spanErrorClass);
          errorElement.textContent = "";
      });
      const inputList = Array.from(this.form.querySelectorAll(this.input));
      inputList.forEach((inputElement) => {
          inputElement.classList.remove(this.inputErrorClass);
      });
  }

  enableValidation() {
    const inputList = Array.from(this.form.querySelectorAll(this.input));
    const buttonElement = this.form.querySelector(this.submitButton);
    inputList.forEach((inputElement) => {
      const errorElement = this.form.querySelector(`${this.inputError}_${inputElement.id}`);
      this._setEventListeners(inputElement, inputList, buttonElement, errorElement);
      });
  };

}
