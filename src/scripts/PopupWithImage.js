import { Popup } from "./Popup.js";
import { imageSelector, popupOpenedSelector, imageTitleSelector } from "./constants.js";

export class PopupWithImage extends Popup {
  constructor(selector, src, title) {
    super(selector);
    this._src = src;
    this._title = title;
  }

  open() {
    this._popup.querySelector(imageSelector).src = this._src;
    this._popup.querySelector(imageTitleSelector).alt = this._title;
    this._popup.querySelector(imageTitleSelector).textContent = this._title;
    super.open();
  }
}
