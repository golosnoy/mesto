import { openPopup, popupImage, popupImageImg, popupImageTitle } from "./utils.js";

export class Card {
  constructor(data) {
          this.name = data.name;
          this.link = data.link;
          this.element = this._getTemplate();
  }

  _getTemplate() {
    const cardElement = document.querySelector("#card-template").content.querySelector(".cards__element").cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this.element.querySelector(".cards__like").addEventListener("click", this._handleLikeClick);
    this.element.querySelector(".cards__trash").addEventListener("click",  this._handleTrashClick);
    this.element.querySelector(".cards__image").addEventListener("click", this._handleImageClick);
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle("cards__like_active");
  }

  _handleTrashClick(evt) {
    evt.target.closest('.cards__element').remove();
  }

  _handleImageClick() {
    popupImageImg.src = this.src;
    popupImageImg.alt = this.alt;
    popupImageTitle.textContent = this.alt;
    openPopup(popupImage);
  }

  generateCard() {
    this._setEventListeners();
    this.element.querySelector(".cards__title").textContent = this.name;
    this.element.querySelector(".cards__image").src = this.link;
    this.element.querySelector(".cards__image").alt = this.name;
    return this.element;
  }

  };
