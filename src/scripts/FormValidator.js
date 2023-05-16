export class FormValidator {
  constructor(config, form) {
    this.form = form,
    this.input = config.inputSelector,
    this.submitButton = config.submitButtonSelector,
    this.button = this.form.querySelector(config.submitButtonSelector),
    this.inputError = config.inputErrorSelector,
    this.inactiveButtonClass = config.inactiveButtonClass,
    this.inputErrorClass = config.inputErrorClass,
    this.spanErrorClass = config.spanErrorClass
    this._inputList = Array.from(this.form.querySelectorAll(this.input))
  }

  _setEventListeners(inputElement, errorElement) {
    inputElement.addEventListener("input", () => {
        this._isValid(inputElement, errorElement);
        this._toggleButtonState(this.button);
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

  activateButton() {
    this.button.classList.add(this.inactiveButtonClass);
    this.button.setAttribute('disabled', true);
  };

  inactivateButton() {
    this.button.classList.remove(this.inactiveButtonClass);
    this.button.removeAttribute('disabled');
  };

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
        this.activateButton(this.button);
    } else {
        this.inactivateButton(this.button);
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
    this._inputList.forEach((inputElement) => {
      const errorElement = this.form.querySelector(`${this.inputError}_${inputElement.id}`);
      this._setEventListeners(inputElement, errorElement);
      });
  };

}
