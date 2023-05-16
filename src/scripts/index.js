import '../pages/index.css';

import { Section } from "./Section.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { FormValidator } from "./FormValidator.js";
import { UserInfo } from "./UserInfo.js";
import { validationConfig } from "./config.js";
import { initialCards } from "./cards.js";

import {
  popupProfileSelector,
  popupContentSelector,
  userNameSelector,
  userInfoSelector,
  profileEditButton,
  contentAddButton,
  cardsContainerSelector,
  popupProfileForm,
  popupContentForm
} from "./constants.js";

import {
  handleProfileSubmit,
  handleContentSubmit,
  handleProfileEditButton,
  handleContentAddButton,
  renderCards
} from "./utils.js"

profileEditButton.addEventListener("click", handleProfileEditButton);
contentAddButton.addEventListener("click", handleContentAddButton);

export const popupProfile = new PopupWithForm(popupProfileSelector, handleProfileSubmit);
export const popupContent = new PopupWithForm(popupContentSelector, handleContentSubmit);
export const createSection = new Section({data: initialCards, renderer: renderCards}, cardsContainerSelector);
export const profileFormValidation = new FormValidator(validationConfig, popupProfileForm);
export const contentFormValidation = new FormValidator(validationConfig, popupContentForm);
export const userInfo = new UserInfo({userNameSelector, userInfoSelector});

profileFormValidation.enableValidation();
contentFormValidation.enableValidation();
createSection.renderItems();
userInfo.setUserInfo("Sergey Golosnoy", "Frontend-developer");
