import { Popup } from "./Popup.js";
import { formSelector, buttonSubmitSelector, formInputSelector } from "../utils/constants.js";

export class PopupWithForm extends Popup {
  constructor(selector, handleSubmitButton, handleSubmit) {
    super(selector);
    this._handleSubmitButton = handleSubmitButton;
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(formSelector);
    this._button = this._popup.querySelector(buttonSubmitSelector);
    this._inputList = this._form.querySelectorAll(formInputSelector);
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
      });
    return this._formValues

  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmitButton.bind(this));
  }

  close() {
    this._form.reset();
    super.close();
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

}


