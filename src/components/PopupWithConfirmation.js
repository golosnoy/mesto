import { Popup } from "./Popup.js";
import { buttonSubmitSelector, formSelector } from "../utils/constants.js";

export class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);
    this._form = this._popup.querySelector(formSelector);
    this._button = this._popup.querySelector(buttonSubmitSelector);

  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit();
      super.close();
    });
  }

  open(handle) {
    super.open();
    this._handleSubmit = handle;
  }


}


