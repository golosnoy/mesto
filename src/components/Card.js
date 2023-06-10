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

import { api } from "../pages/index.js";
import { userId, popupConfirmation } from "../pages/index.js";

export class Card {
  constructor(data, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._owner = data.owner._id;
    this._id = data._id;
    this._likes = data.likes;
    this._likeCount = data.likes.length;
    this._userId = userId;
    this._isLiked = false;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._cardTitle = this._element.querySelector(cardTitleSelector);
    this._cardImage = this._element.querySelector(cardImageSelector);
    this._cardTrashButton = this._element.querySelector(cardTrashSelector);
    this._cardLikeCounter = this._element.querySelector(cardsLikeCounterSelector);
    this._handleTrashClick = this._handleTrashClick.bind(this);
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
    this._cardLikeButton.addEventListener("click", this._handleLikeClick.bind(this));
    if (this._owner === this._userId) {
      this._cardTrashButton.addEventListener("click",  this._handleTrashClick);
    };
    this._cardImage.addEventListener("click", this._handleCardClick.bind(null, this._link, this._name));
  }

  _isLikedByUser() {
    this._likes.forEach((like) => {
      if (like._id === this._userId) {
        this._isLiked = true;
        this._cardLikeButton.classList.add(cardLikeActiveSelector);
      };
    });
  }

  _handleLikeClick() {
    if (this._isLiked) {
      api.dislikeCard(this._id)
        .then((res) => {
          this._cardLikeCounter.textContent = res.likes.length;
        });
      this._isLiked = false;
      this._cardLikeButton.classList.remove(cardLikeActiveSelector);
    } else {
      api.likeCard(this._id)
        .then((res) => {
          this._cardLikeCounter.textContent = res.likes.length;
      });
      this._isLiked = true;
      this._cardLikeButton.classList.add(cardLikeActiveSelector);
    }
  }

  _handleTrashClick() {
    popupConfirmation.open(() => {
        api.deleteCard(this._id);
        this._element.remove();
        this._element = null;
    });
  };

  generateCard() {
    this._setEventListeners();
    this._isLikedByUser();
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardLikeCounter.textContent = this._likeCount;
    return this._element;
  }
};
