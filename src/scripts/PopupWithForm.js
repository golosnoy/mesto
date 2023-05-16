import { Popup } from "./Popup.js";
import { formSelector, buttonSubmitSelector, formInputSelector } from "./constants.js";

export class PopupWithForm extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(formSelector);
    this._button = this._popup.querySelector(buttonSubmitSelector);
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll(formInputSelector);
    this._formValues = {};
    this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener("submit", this._handleSubmit);
  }

  close() {
    this._form.reset();
    super.close();
  }
}


