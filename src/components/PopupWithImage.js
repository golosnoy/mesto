import { Popup } from "./Popup.js";
import { imageSelector, imageTitleSelector } from "../utils/constants.js";

export class PopupWithImage extends Popup {
  constructor(selector, src, title) {
    super(selector);
    this._src = src;
    this._title = title;
    this._image = this._popup.querySelector(imageSelector);
    this._imageTitile = this._popup.querySelector(imageTitleSelector);
  }

  open(src, title) {
    this._image.src = src;
    this._image.alt = title;
    this._imageTitile.textContent = title;
    super.open();
  }
}
