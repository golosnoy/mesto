const cards = document.querySelector(".cards__elements");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileEditButton = document.querySelector(".profile__edit-button");

const contentAddButton = document.querySelector(".profile__add-button");
const contenttrashButton = document.querySelector(".cards__trash");

const popupProfile = document.querySelector(".popup");
const popupProfileForm = document.querySelector(".popup__form");
const popupProfileTitle = document.querySelector("#author_name");
const popupProfileSubtitle = document.querySelector("#author_about");
const popupProfileSubmitButton = document.querySelector(".popup__submit-button");
const popupProfileCloseButton = document.querySelector(".popup__close-button");

const popupContent = document.querySelector(".popup-content");
const popupContentForm = document.querySelector(".popup-content__form");
const popupContentPlaceName = document.querySelector("#place_name");
const popupContentImageUrl = document.querySelector("#img_url");
const popupContentSubmitButton = document.querySelector(".popup-content__submit-button");
const popupContentCloseButton = document.querySelector(".popup-content__close-button");

const popupImage = document.querySelector(".popup-image");
const popupImageCloseButton = document.querySelector(".popup-image__close-button");
const popupImageImg = popupImage.querySelector(".popup-image__image");
const popupImageTitle = popupImage.querySelector(".popup-image__title");

function getClone() {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardsElement = cardTemplate.querySelector(".cards__element").cloneNode(true);
  return cardsElement;
}

function renderCard(cardsElement) {
  cards.prepend(cardsElement);
  likeButtonListener(cardsElement);
  trashButtonListener(cardsElement);
  contentImageListener(cardsElement);
}

function createContent() {
  initialCards.forEach(function (item) {
      const cardsElement = getClone();
      cardsElement.querySelector(".cards__title").textContent = item.name;
      cardsElement.querySelector(".cards__image").src = item.link;
      cardsElement.querySelector(".cards__image").alt = item.name;
      renderCard(cardsElement);
  });
}

function addContent(evt) {
  evt.preventDefault();
  cardsElement = getClone();
  cardsElement.querySelector(".cards__title").textContent = popupContentPlaceName.value;
  cardsElement.querySelector(".cards__image").src = popupContentImageUrl.value;
  cardsElement.querySelector(".cards__image").alt = popupContentPlaceName.value;
  renderCard(cardsElement);
  closePopupContent();
}

function editProfile() {
  popupProfileTitle.value = profileTitle.textContent;
  popupProfileSubtitle.value = profileSubtitle.textContent;
  popupProfile.classList.add("popup_opened");
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function closePopupProfile() {
  popupProfile.classList.remove("popup_opened");
}

function closePopupContent() {
  popupContent.classList.remove("popup-content_opened");
  popupContentPlaceName.value = "";
  popupContentImageUrl.value = "";
}

function closePopupImage() {
  popupImage.classList.remove("popup-image_opened");
}

function submitProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupProfileTitle.value;
  profileSubtitle.textContent = popupProfileSubtitle.value;
  closePopupProfile();
}

function openPopupContent() {
  popupContent.classList.add("popup-content_opened");
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
      popupImage.classList.add("popup-image_opened");
      popupImageImg.src = contentImage.src;
      popupImageImg.alt = contentTitle.textContent;
      popupImageTitle.textContent = contentTitle.textContent;
  });
}

profileEditButton.addEventListener("click", editProfile);
popupProfileCloseButton.addEventListener("click", closePopupProfile);
popupProfileForm.addEventListener("submit", submitProfile);
contentAddButton.addEventListener("click", openPopupContent);
popupContentCloseButton.addEventListener("click", closePopupContent);
popupContentForm.addEventListener("submit", addContent);
popupImageCloseButton.addEventListener("click", closePopupImage);

createContent();
