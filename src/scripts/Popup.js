import { buttonCloseSelector, popupOpenedSelector } from "./constants.js";

export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  open() {
    this._popup.classList.add(popupOpenedSelector);
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove(popupOpenedSelector);
    this.removeEventListeners();
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
    document.addEventListener("keydown", this._handleEscClose.bind(this));
    this._popup.addEventListener("click", this._handleOverlayClose.bind(this));
    this._popup.querySelector(buttonCloseSelector).addEventListener('click', this._handleButtonClose.bind(this))
  }

  removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
    this._popup.removeEventListener("click", this._handleOverlayClose.bind(this));
    this._popup.querySelector(buttonCloseSelector).removeEventListener('click', this._handleButtonClose.bind(this))
  }
}
