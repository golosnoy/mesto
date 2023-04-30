import { FormValidator } from "./FormValidator.js";
import { validationConfig } from "./config.js";
import { Card } from "./Card.js";
import { initialCards } from "./cards.js";
import { openPopup, closePopup } from "./utils.js";

const cards = document.querySelector(".cards__elements");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileEditButton = document.querySelector(".profile__edit-button");

const contentAddButton = document.querySelector(".profile__add-button");

const popupProfile = document.querySelector(".popup_profile");
const popupProfileForm = document.querySelector(".popup__form_profile");
const popupProfileTitle = document.querySelector("#author_name");
const popupProfileSubtitle = document.querySelector("#author_about");

const popupContent = document.querySelector(".popup_content");
const popupContentForm = document.querySelector(".popup__form_content");
const popupContentPlaceName = document.querySelector("#place_name");
const popupContentImageUrl = document.querySelector("#img_url");

const buttonElement = popupContentForm.querySelector('.popup__submit-button');


function createContent() {
    initialCards.forEach(function (item) {
        const inicialCard = new Card(item);
        cards.append(inicialCard.generateCard());
    });
}

function clearErrors(popup) {
  const errorList = Array.from(popup.querySelectorAll(".popup__input-error"));
    errorList.forEach((errorElement) => {
        errorElement.classList.remove("popup__input-error_active");
        errorElement.textContent = "";
    });
    const inputList = Array.from(popup.querySelectorAll(".popup__input"));
    inputList.forEach((inputElement) => {
        inputElement.classList.remove("popup__input_type_error");
    });
}

function addContent(evt) {
  evt.preventDefault();
  const newCardObject = {};
  newCardObject.name = popupContentPlaceName.value;
  newCardObject.link = popupContentImageUrl.value;
  const newCard = new Card(newCardObject);
  cards.prepend(newCard.generateCard());
  closePopup(popupContent);
}

function openProfile(evt) {
    popupProfileTitle.value = profileTitle.textContent;
    popupProfileSubtitle.value = profileSubtitle.textContent;
    clearErrors(popupProfile);
    openPopup(popupProfile);
}

function submitProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupProfileTitle.value;
    profileSubtitle.textContent = popupProfileSubtitle.value;
    closePopup(popupProfile);
}

function openPopupContent(evt) {
    popupContentForm.reset();
    buttonElement.classList.add("popup__submit-button_inactive");
    buttonElement.setAttribute('disabled', true);
    clearErrors(popupContent);
    openPopup(popupContent);
}

profileEditButton.addEventListener("click", openProfile);
popupProfileForm.addEventListener("submit", submitProfile);
contentAddButton.addEventListener("click", openPopupContent);
popupContentForm.addEventListener("submit", addContent);

document.querySelectorAll(".popup__close-button").forEach((button) => {
    const buttonsPopup = button.closest(".popup");
    button.addEventListener("click", function() {
      closePopup(buttonsPopup);
    });
});

createContent();
const formsValidation = new FormValidator(validationConfig);
formsValidation.enableValidation();
