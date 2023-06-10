import { Popup } from "./Popup.js";
import { formSelector, buttonSubmitSelector, formInputSelector } from "../utils/constants.js";

export class PopupEditAvatar extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(formSelector);
    this._button = this._popup.querySelector(buttonSubmitSelector);
    this._input = this._form.querySelector(formInputSelector);
  }

  _getInputValues() {
    this._url = this._input.value;
    return this._url;
  }

  async _handleSubmitButton(evt) {
    evt.preventDefault();
    const originalText = this._button.textContent;
    try {
      this._button.textContent = 'Сохранение...';
      await this._handleSubmit(this._getInputValues());
      this.close();
    } finally {
      this._button.textContent = originalText;
    }
  };

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


