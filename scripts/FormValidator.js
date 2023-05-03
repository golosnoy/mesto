export class FormValidator {
  constructor(config, form) {
    this.form = form,
    this.input = config.inputSelector,
    this.submitButton = config.submitButtonSelector,
    this.inputError = config.inputErrorSelector,
    this.inactiveButtonClass = config.inactiveButtonClass,
    this.inputErrorClass = config.inputErrorClass,
    this.spanErrorClass = config.spanErrorClass
    this._inputList = Array.from(this.form.querySelectorAll(this.input))
  }

  _setEventListeners(inputElement, buttonElement, errorElement) {
    inputElement.addEventListener("input", () => {
        this._isValid(inputElement, errorElement);
        this._toggleButtonState(buttonElement);
  });
  };

  _isValid(inputElement, errorElement) {
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement, errorElement, inputElement.validationMessage);
    } else {
        this._hideInputError(inputElement, errorElement);
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
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

  _toggleButtonState(buttonElement) {
    if (this._hasInvalidInput(this._inputList)) {
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
      this._inputList.forEach((inputElement) => {
          inputElement.classList.remove(this.inputErrorClass);
      });
  }

  enableValidation() {
    const buttonElement = this.form.querySelector(this.submitButton);
    this._inputList.forEach((inputElement) => {
      const errorElement = this.form.querySelector(`${this.inputError}_${inputElement.id}`);
      this._setEventListeners(inputElement, buttonElement, errorElement);
      });
  };

}
