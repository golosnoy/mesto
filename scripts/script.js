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

function renderCard(cardTitle, cardImage) {
    const cardTemplate = document.querySelector("#card-template").content;
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
        newCard = renderCard(cardTitle, cardImage);
        cards.append(newCard);
    });
}

function addContent(evt) {
    evt.preventDefault();
    if (popupContentPlaceName.value && popupContentImageUrl.value) {
        const cardTitle = popupContentPlaceName.value;
        const cardImage = popupContentImageUrl.value;
        newCard = renderCard(cardTitle, cardImage);
        cards.prepend(newCard);
        closePopup(evt);
    } else {
        closePopup(evt);
    }
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

function closePopup(evt) {
    evt.target.closest("div.popup_opened").classList.remove("popup_opened");
}

function openProfile(evt) {
    popupProfileTitle.value = profileTitle.textContent;
    popupProfileSubtitle.value = profileSubtitle.textContent;
    openPopup(popupProfile);
}

function submitProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupProfileTitle.value;
    profileSubtitle.textContent = popupProfileSubtitle.value;
    closePopup(evt);
}

function openPopupContent(evt) {
    popupContentPlaceName.value = "";
    popupContentImageUrl.value = "";
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
popupProfileCloseButton.addEventListener("click", closePopup);
popupProfileForm.addEventListener("submit", submitProfile);
contentAddButton.addEventListener("click", openPopupContent);
popupContentCloseButton.addEventListener("click", closePopup);
popupContentForm.addEventListener("submit", addContent);
popupImageCloseButton.addEventListener("click", closePopup);

createContent();
