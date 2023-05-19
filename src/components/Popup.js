import { buttonCloseSelector, popupOpenedSelector } from "../utils/constants.js";

export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._handleButtonClose = this._handleButtonClose.bind(this);
  }

  open() {
    this._popup.classList.add(popupOpenedSelector);
  }

  close() {
    this._popup.classList.remove(popupOpenedSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  _handleButtonClose() {
    this.close();
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.addEventListener("click", this._handleOverlayClose);
    this._popup.querySelector(buttonCloseSelector).addEventListener('click', this._handleButtonClose)
  }

}
