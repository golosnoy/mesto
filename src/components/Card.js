import {
  cardTitleSelector,
  cardImageSelector,
  cardTemplateSelector,
  cardElementSelector,
  cardLikeSelector,
  cardTrashSelector,
  cardLikeActiveSelector,
  cardsLikeCounterSelector
} from "../utils/constants.js";

export class Card {
  constructor(data, handleTrashClick, handleLikeClick, handleCardClick, userId) {
    this._name = data.name;
    this._link = data.link;
    this._owner = data.owner._id;
    this._id = data._id;
    this._likes = data.likes;
    this._likeCount = data.likes.length;
    this._userId = userId;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._cardTitle = this._element.querySelector(cardTitleSelector);
    this._cardImage = this._element.querySelector(cardImageSelector);
    this._cardTrashButton = this._element.querySelector(cardTrashSelector);
    this._cardLikeCounter = this._element.querySelector(cardsLikeCounterSelector);
    this._cardLikeButton = this._element.querySelector(cardLikeSelector);
  }

  _getTemplate() {
    const cardElement = document.querySelector(cardTemplateSelector).content.querySelector(cardElementSelector).cloneNode(true);
    if (this._owner !== this._userId) {
      cardElement.querySelector(cardTrashSelector).remove();
    };
    return cardElement;
  }

  _setEventListeners() {
    const card = this;
    this._cardLikeButton.addEventListener("click", this._handleLikeClick.bind(this, card));
    if (this._owner === this._userId) {
      this._cardTrashButton.addEventListener("click",  this._handleTrashClick.bind(null,card));
    };
    this._cardImage.addEventListener("click", this._handleCardClick.bind(null, card._link, card._name));
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  _updateLikesView() {
    this._cardLikeCounter.textContent = this._likes.length;
    this._cardLikeButton.classList.toggle(cardLikeActiveSelector, this.isLiked());
  }

  updateLikes(likes) {
    this._likes = likes;
    this._updateLikesView();
  }

  generateCard() {
    this._setEventListeners();
    this.updateLikes(this._likes);
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardLikeCounter.textContent = this._likeCount;
    return this._element;
  }

  removeCard(card) {
    card._element.remove();
    card._element = null;
  }

};
