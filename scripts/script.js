const cards = document.querySelector(".cards__elements");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileEditButton = document.querySelector(".profile__edit-button");

const contentAddButton = document.querySelector(".profile__add-button");
const contenttrashButton = document.querySelector(".cards__trash");

const popupProfile = document.querySelector(".popup_profile");
const popupProfileForm = document.querySelector(".popup__form_profile");
const popupProfileTitle = document.querySelector("#author_name");
const popupProfileSubtitle = document.querySelector("#author_about");
const popupProfileSubmitButton = document.querySelector(".popup__submit-button");
const popupProfileCloseButton = document.querySelector(".popup__close-button_profile");

const popupContent = document.querySelector(".popup_content");
const popupContentForm = document.querySelector(".popup__form_content");
const popupContentPlaceName = document.querySelector("#place_name");
const popupContentImageUrl = document.querySelector("#img_url");
const popupContentSubmitButton = document.querySelector(".popup-content__submit-button");
const popupContentCloseButton = document.querySelector(".popup__close-button_content");

const popupImage = document.querySelector(".popup_image");
const popupImageCloseButton = document.querySelector(".popup__close-button_image");
const popupImageImg = popupImage.querySelector(".popup__image");
const popupImageTitle = popupImage.querySelector(".popup__image-title");
const cardTemplate = document.querySelector("#card-template").content;

const buttonElement = popupContentForm.querySelector('.popup__submit-button');

function renderCard(cardTitle, cardImage) {
    const newCard = cardTemplate.querySelector(".cards__element").cloneNode(true);
    newCard.querySelector(".cards__title").textContent = cardTitle;
    newCard.querySelector(".cards__image").src = cardImage;
    newCard.querySelector(".cards__image").alt = cardTitle;
    likeButtonListener(newCard);
    trashButtonListener(newCard);
    contentImageListener(newCard);
    return newCard;
}

function createContent() {
    initialCards.forEach(function (item) {
        const cardTitle = item.name;
        const cardImage = item.link;
        const newCard = renderCard(cardTitle, cardImage);
        cards.append(newCard);
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

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", closePopupByPressEsc);
    popup.addEventListener("click", closePopupByClickOverlay);
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", closePopupByPressEsc);
    popup.removeEventListener("click", closePopupByClickOverlay);
}

function addContent(evt) {
  evt.preventDefault();
  const cardTitle = popupContentPlaceName.value;
  const cardImage = popupContentImageUrl.value;
  const newCard = renderCard(cardTitle, cardImage);
  cards.prepend(newCard);
  closePopup(popupContent);
}

function closePopupByPressEsc(evt) {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector(".popup_opened");
        closePopup(popupOpened);
    }
}

function closePopupByClickOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target);
    }
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

function likeButtonListener(cardItem) {
    const likeButton = cardItem.querySelector(".cards__like");
    likeButton.addEventListener("click", function (evt) {
        evt.target.classList.toggle("cards__like_active");
    });
}

function trashButtonListener(cardItem) {
    const trashButton = cardItem.querySelector(".cards__trash");
    trashButton.addEventListener("click", function () {
        cardItem.remove();
    });
}

function contentImageListener(cardItem) {
    const contentImage = cardItem.querySelector(".cards__image");
    const contentTitle = cardItem.querySelector(".cards__title");
    contentImage.addEventListener("click", function (evt) {
        popupImageImg.src = contentImage.src;
        popupImageImg.alt = contentTitle.textContent;
        popupImageTitle.textContent = contentTitle.textContent;
        openPopup(popupImage);
    });
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
