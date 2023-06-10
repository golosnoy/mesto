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
import { PopupEditAvatar } from '../components/PopupEditAvatar.js';

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

const userInfo = new UserInfo({userNameSelector, userInfoSelector, userAvatarSelector});

export const api = new Api(domen, token, cohort);

export let userId = null;

api.getAppInfo()
  .then(([cardsData, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    createSection.renderItems(cardsData);
  });

function createCard(cardData) {
  const cardElement = new Card(cardData, handleCardClick);
  const newCard = cardElement.generateCard();
  return newCard;
}

function handleProfileEditButton() {
  const userProfile = userInfo.getUserInfo();
  popupProfileTitle.value = userProfile.name;
  popupProfileSubtitle.value = userProfile.job;
  profileFormValidation.clearErrors();
  popupProfile.open();
}

function handleContentAddButton() {
  contentFormValidation.disableButton()
  contentFormValidation.clearErrors();
  popupContent.open();
}

function handleCardClick(link, name) {
  popupImage.open(link, name);
}

function renderCards(item) {
  const newCard = createCard(item);
  createSection.addItem(newCard);
}

function handleAvatarClick() {
  popupEditAvatar.open();
}

profileEditButton.addEventListener("click", handleProfileEditButton);
avatarContainer.addEventListener("click", handleAvatarClick)
contentAddButton.addEventListener("click", handleContentAddButton);

const popupProfile = new PopupWithForm(popupProfileSelector, (userData) => {
  api.patchUserInfo(userData);
  api.getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
  });
}
);

const popupContent = new PopupWithForm(popupContentSelector, (newCardValues) => {
  const newCard = ({name: newCardValues.place_name, link: newCardValues.img_url});
  api.postCard(newCard)
  .then((res) => createCard(res))
  .then((res) => createSection.prependItem(res));
});

export const popupConfirmation = new PopupWithConfirmation(popupConfirmationSelector);
export const popupEditAvatar = new PopupEditAvatar(popupEditAvatarSelector, (url) => {
  api.updateAvatar(url);
  avatarImage.src = url;
});

const popupImage = new PopupWithImage(popupImageSelector);
const createSection = new Section({renderer: renderCards}, cardsContainerSelector);
const profileFormValidation = new FormValidator(validationConfig, popupProfileForm);
const contentFormValidation = new FormValidator(validationConfig, popupContentForm);
const avatarFormValidation = new FormValidator(validationConfig, popupAvatarForm);


popupContent.setEventListeners();
popupProfile.setEventListeners();
popupImage.setEventListeners();
popupConfirmation.setEventListeners();
popupEditAvatar.setEventListeners();

profileFormValidation.enableValidation();
contentFormValidation.enableValidation();
avatarFormValidation.enableValidation();



