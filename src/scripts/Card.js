import {
  cardTitleSelector,
  cardImageSelector,
  cardTemplateSelector,
  cardElementSelector,
  cardLikeSelector,
  cardTrashSelector,
  cardLikeActiveSelector
} from "./constants.js";
export class Card {
  constructor(data, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._handleCardClick = handleCardClick;
    this.element = this._getTemplate();
    this.cardTitle = this.element.querySelector(cardTitleSelector)
    this.cardImage = this.element.querySelector(cardImageSelector)
  }

  _getTemplate() {
    const cardElement = document.querySelector(cardTemplateSelector).content.querySelector(cardElementSelector).cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this.element.querySelector(cardLikeSelector).addEventListener("click", this._handleLikeClick);
    this.element.querySelector(cardTrashSelector).addEventListener("click",  this._handleTrashClick.bind(this));
    this.cardImage.addEventListener("click", this._handleCardClick.bind(this));
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle(cardLikeActiveSelector);
  }

  _handleTrashClick() {
    this.element.remove();
    this._element = null;
  }

  generateCard() {
    this._setEventListeners();
    this.cardTitle.textContent = this._name;
    this.cardImage.src = this._link;
    this.cardImage.alt = this._name;
    return this.element;
  }
};
