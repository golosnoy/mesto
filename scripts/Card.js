import { openPopup, popupImage, popupImageImg, popupImageTitle } from "./utils.js";

export class Card {
  constructor(data) {
          this._name = data.name;
          this._link = data.link;
          this.element = this._getTemplate();
          this.cardTitle = this.element.querySelector(".cards__title")
          this.cardImage = this.element.querySelector(".cards__image")
  }

  _getTemplate() {
    const cardElement = document.querySelector("#card-template").content.querySelector(".cards__element").cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this.element.querySelector(".cards__like").addEventListener("click", this._handleLikeClick);
    this.element.querySelector(".cards__trash").addEventListener("click",  this._handleTrashClick.bind(this));
    this.cardImage.addEventListener("click", this._handleImageClick);
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle("cards__like_active");
  }

  _handleTrashClick() {
    this.element.remove();;
  }

  _handleImageClick() {
    popupImageImg.src = this.src;
    popupImageImg.alt = this.alt;
    popupImageTitle.textContent = this.alt;
    openPopup(popupImage);
  }

  generateCard() {
    this._setEventListeners();
    this.cardTitle.textContent = this._name;
    this.cardImage.src = this._link;
    this.cardImage.alt = this._name;
    return this.element;
  }

  };
