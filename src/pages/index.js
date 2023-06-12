import '../pages/index.css';

import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { Card } from "../components/Card.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { validationConfig } from "../utils/config.js";
import { Api } from '../components/Api.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';

import {
  popupProfileSelector,
  popupContentSelector,
  userNameSelector,
  userInfoSelector,
  profileEditButton,
  contentAddButton,
  cardsContainerSelector,
  popupProfileForm,
  popupImageSelector,
  popupContentForm,
  popupProfileTitle,
  popupProfileSubtitle,
  userAvatarSelector,
  domen, token, cohort,
  popupConfirmationSelector,
  avatarImage,
  popupEditAvatarSelector,
  popupAvatarForm,
  avatarContainer
} from "../utils/constants.js";

let userId = null;

function createCard(cardData) {
  const cardElement = new Card(cardData, handleTrashClick, handleLikeClick, handleCardClick, userId);
  const newCard = cardElement.generateCard();
  return newCard;
};

function handleProfileEditButton() {
  const userProfile = userInfo.getUserInfo();
  popupProfileTitle.value = userProfile.name;
  popupProfileSubtitle.value = userProfile.job;
  profileFormValidation.clearErrors();
  popupProfile.open();
};

function handleContentAddButton() {
  contentFormValidation.disableButton()
  contentFormValidation.clearErrors();
  popupContent.open();
};

function handleCardClick(link, name) {
  popupImage.open(link, name);
};

function handleTrashClick() {
  popupConfirmation.open(() => {
      api.deleteCard(this._id)
      .then(() => {
        this._element.remove();
        this._element = null;
      })
      .catch((err) =>{
        console.log(err);
      });
  });
};

function handleLikeClick() {
  if (this._isLiked) {
    api.dislikeCard(this._id)
      .then((res) => {
        this.updateLikes(res.likes);
        this._isLiked = false;
      })
      .catch((err) =>{
        console.log(err);
      });
  } else {
    api.likeCard(this._id)
      .then((res) => {
        this.updateLikes(res.likes);
        this._isLiked = true;
    })
    .catch((err) =>{
      console.log(err);
    });
  }
}

async function handleSubmitButton(evt) {
  evt.preventDefault();
  const originalText = this._button.textContent;
  try {
    this._button.textContent = 'Сохранение...';
    await this._handleSubmit(this._getInputValues());
    this.close();
  } finally {
    this._button.textContent = originalText;
  }
};

function renderCards(item) {
  const newCard = createCard(item);
  createSection.addItem(newCard);
};

function handleAvatarClick() {
  popupEditAvatar.open();
};

export const api = new Api(domen, token, cohort);
const userInfo = new UserInfo({userNameSelector, userInfoSelector, userAvatarSelector});

const popupProfile = new PopupWithForm(popupProfileSelector, handleSubmitButton, (userData) => {
  api.patchUserInfo(userData);
  api.getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
  })
  .catch((err) =>{
    console.log(err);
  });
});

const popupContent = new PopupWithForm(popupContentSelector, handleSubmitButton, (newCardValues) => {
  const newCard = ({name: newCardValues.place_name, link: newCardValues.img_url});
  api.postCard(newCard)
  .then((res) => createCard(res))
  .then((res) => createSection.prependItem(res))
  .catch((err) =>{
    console.log(err);
  });
});

export const popupConfirmation = new PopupWithConfirmation(popupConfirmationSelector);
export const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, handleSubmitButton, (res) => {
  let newAvatar = res.profile_avatar;
  api.updateAvatar(newAvatar);
  avatarImage.src = newAvatar;
  });

const popupImage = new PopupWithImage(popupImageSelector);
const createSection = new Section({renderer: renderCards}, cardsContainerSelector);
const profileFormValidation = new FormValidator(validationConfig, popupProfileForm);
const contentFormValidation = new FormValidator(validationConfig, popupContentForm);
const avatarFormValidation = new FormValidator(validationConfig, popupAvatarForm);

api.getAppInfo()
  .then(([cardsData, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    createSection.renderItems(cardsData);
  })
  .catch((err) =>{
    console.log(err);
  });

profileEditButton.addEventListener("click", handleProfileEditButton);
avatarContainer.addEventListener("click", handleAvatarClick);
contentAddButton.addEventListener("click", handleContentAddButton);

popupContent.setEventListeners();
popupProfile.setEventListeners();
popupImage.setEventListeners();
popupConfirmation.setEventListeners();
popupEditAvatar.setEventListeners();

profileFormValidation.enableValidation();
contentFormValidation.enableValidation();
avatarFormValidation.enableValidation();



