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

function handleTrashClick(card) {
  console.log(card);
  popupConfirmation.open(() => {
      api.deleteCard(card._id)
      .then(() => {
        card.removeCard(card);
      })
      .catch((err) =>{
        console.log(err);
      });
  });
};

function handleLikeClick(card) {
  if (card.isLiked()) {
    api.dislikeCard(card._id)
      .then((res) => {
        card.updateLikes(res.likes);
      })
      .catch((err) =>{
        console.log(err);
      });
  } else {
    api.likeCard(card._id)
      .then((res) => {
        card.updateLikes(res.likes);
    })
    .catch((err) =>{
      console.log(err);
    });
  }
}

function renderCards(item) {
  const newCard = createCard(item);
  createSection.addItem(newCard);
};

function handleAvatarClick() {
  popupEditAvatar.open();
};

const api = new Api(domen, token, cohort);
const userInfo = new UserInfo({userNameSelector, userInfoSelector, userAvatarSelector});

const popupProfile = new PopupWithForm(popupProfileSelector, (userData, submitButton) => {
  console.log(userData);
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  api.patchUserInfo(userData)
  .then((res) => {
    userInfo.setUserInfo(res);
    popupProfile.close();
  })
  .catch((err) =>{
    console.log(err);
  })
  .finally(() => {
    submitButton.textContent = originalText;
  });
});

const popupContent = new PopupWithForm(popupContentSelector, (newCardValues, submitButton) => {
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  const newCard = ({name: newCardValues.place_name, link: newCardValues.img_url});
  api.postCard(newCard)
  .then((res) => createCard(res))
  .then((res) => createSection.prependItem(res))
  .then(() => popupContent.close())
  .catch((err) =>{
    console.log(err);
  })
  .finally(() => {
    submitButton.textContent = originalText;
  });
});

const popupConfirmation = new PopupWithConfirmation(popupConfirmationSelector);
const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, (res, submitButton) => {
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  let newAvatar = res.profile_avatar;
  api.updateAvatar(newAvatar)
  .catch((err) =>{
    console.log(err);
  })
  .finally(() => {
    popupEditAvatar.close();
    submitButton.textContent = originalText;
    avatarImage.src = newAvatar;
  });
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



