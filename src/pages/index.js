import '../pages/index.css';

import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { FormValidator } from "../components/FormValidator.js";
import { UserInfo } from "../components/UserInfo.js";
import { Card } from "../components/Card.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { validationConfig } from "../utils/config.js";
import { initialCards } from "../utils/cards.js";

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
  contentContainer
} from "../utils/constants.js";

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
  contentFormValidation.activateButton()
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

profileEditButton.addEventListener("click", handleProfileEditButton);
contentAddButton.addEventListener("click", handleContentAddButton);

const popupProfile = new PopupWithForm(popupProfileSelector, (userData) => {
  userInfo.setUserInfo(userData);
}
);

const popupContent = new PopupWithForm(popupContentSelector, (newCardValues) => {
  const newCard = createCard({name: newCardValues.place_name, link: newCardValues.img_url});
  createSection.prependItem(newCard);
});

const popupImage = new PopupWithImage(popupImageSelector);

const createSection = new Section({data: initialCards, renderer: renderCards}, cardsContainerSelector);
const profileFormValidation = new FormValidator(validationConfig, popupProfileForm);
const contentFormValidation = new FormValidator(validationConfig, popupContentForm);
const userInfo = new UserInfo({userNameSelector, userInfoSelector});

popupContent.setEventListeners();
popupProfile.setEventListeners();
popupImage.setEventListeners();

profileFormValidation.enableValidation();
contentFormValidation.enableValidation();
createSection.renderItems();
