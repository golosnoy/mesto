import { Card } from "./Card.js";
import { PopupWithImage } from "./PopupWithImage.js";
import {
  createSection,
  profileFormValidation,
  contentFormValidation,
  popupContent,
  popupProfile
} from "./index.js";

import {
  popupImageSelector,
  popupContentForm,
  buttonElement,
  popupProfileTitle,
  popupProfileSubtitle,
  profileTitle,
  profileSubtitle,
  popupContentPlaceName,
  popupContentImageUrl,
  contentContainer
} from "./constants.js";


export function handleProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupProfileTitle.value;
  profileSubtitle.textContent = popupProfileSubtitle.value;
  popupProfile.close();
}

export function handleContentSubmit(evt) {
  evt.preventDefault();
  const newCardObject = {};
  newCardObject.name = popupContentPlaceName.value;
  newCardObject.link = popupContentImageUrl.value;
  const newCard = new Card(newCardObject, handleCardClick);
  contentContainer.append(newCard.generateCard());
  popupContent.close();
}

export function handleProfileEditButton(evt) {
  popupProfileTitle.value = profileTitle.textContent;
  popupProfileSubtitle.value = profileSubtitle.textContent;
  profileFormValidation.clearErrors();
  popupProfile.open();
}

export function handleContentAddButton(evt) {
  popupContentForm.reset();
  contentFormValidation.activateButton(buttonElement)
  contentFormValidation.clearErrors();
  popupContent.open();
}

export function handleCardClick() {
const popupImage = new PopupWithImage(popupImageSelector, this._link, this._name);
popupImage.open();
}

export function renderCards(initialArray) {
initialArray.forEach((item) => {
  const newCard = new Card(item, handleCardClick);
  createSection.addItem(newCard);
})
}
