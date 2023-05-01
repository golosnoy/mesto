import { FormValidator } from "./FormValidator.js";
import { validationConfig } from "./config.js";
import { Card } from "./Card.js";
import { initialCards } from "./cards.js";
import { openPopup, closePopup } from "./utils.js";

const cards = document.querySelector(".cards__elements");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const editProfileButton = document.querySelector(".profile__edit-button");

const addContentButton = document.querySelector(".profile__add-button");

const popupProfile = document.querySelector(".popup_profile");
const popupProfileForm = document.querySelector(".popup__form_profile");
const popupProfileTitle = document.querySelector("#author_name");
const popupProfileSubtitle = document.querySelector("#author_about");

const popupContent = document.querySelector(".popup_content");
const popupContentForm = document.querySelector(".popup__form_content");
const popupContentPlaceName = document.querySelector("#place_name");
const popupContentImageUrl = document.querySelector("#img_url");

const buttonElement = popupContentForm.querySelector('.popup__submit-button');
const closeButtons = document.querySelectorAll(".popup__close-button");

function createCard(data) {
  const newCard = new Card(data);
  cards.append(newCard.generateCard());
};

function createContent() {
    initialCards.forEach(function (item) {
        createCard(item);
    });
}

function handleSubmitContentButton(evt) {
  evt.preventDefault();
  const newCardObject = {};
  newCardObject.name = popupContentPlaceName.value;
  newCardObject.link = popupContentImageUrl.value;
  createCard(newCardObject);
  closePopup(popupContent);
}

function handleEditProfileButton(evt) {
    popupProfileTitle.value = profileTitle.textContent;
    popupProfileSubtitle.value = profileSubtitle.textContent;
    profileFormValidation.clearErrors();
    openPopup(popupProfile);
}

function handleSubmitProfileButton(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupProfileTitle.value;
    profileSubtitle.textContent = popupProfileSubtitle.value;
    closePopup(popupProfile);
}

function handleAddContentButton(evt) {
    popupContentForm.reset();
    contentFormValidation.activateButton(buttonElement)
    contentFormValidation.clearErrors();
    openPopup(popupContent);
}

editProfileButton.addEventListener("click", handleEditProfileButton);
popupProfileForm.addEventListener("submit", handleSubmitProfileButton);
addContentButton.addEventListener("click", handleAddContentButton);
popupContentForm.addEventListener("submit", handleSubmitContentButton);

closeButtons.forEach((button) => {
    const buttonsPopup = button.closest(".popup");
    button.addEventListener("click", function() {
      closePopup(buttonsPopup);
    });
});

createContent();
const profileFormValidation = new FormValidator(validationConfig, popupProfileForm);
profileFormValidation.enableValidation();
const contentFormValidation = new FormValidator(validationConfig, popupContentForm);
contentFormValidation.enableValidation();
