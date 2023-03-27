const initialCards = [
  {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cards = document.querySelector(".cards__elements");

const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileEditButton = document.querySelector(".profile__edit-button");
const contentAddButton = document.querySelector(".profile__add-button");
const contentDeleteButton = document.querySelector(".cards__trash");

const popupTitle = document.querySelector("#author_name");
const popupSubtitle = document.querySelector("#author_about");
const popupSubmitButton = document.querySelector(".popup__submit-button");
const popupCloseButton = document.querySelector(".popup__close-button");
const popup = document.querySelector(".popup");
const popupForm = document.querySelector(".popup__form");

const popupContentPlaceName = document.querySelector("#place_name");
const popupContentImageUrl = document.querySelector("#img_url");
const popupContentSubmitButton = document.querySelector(".popup-content__submit-button");
const popupContentCloseButton = document.querySelector(".popup-content__close-button");
const popupContent = document.querySelector(".popup-content");
const popupContentForm = document.querySelector(".popup-content__form");

const popupImage = document.querySelector(".popup-image");
const popupImageCloseButton = document.querySelector(".popup-image__close-button");
const popupImageImg = popupImage.querySelector(".popup-image__image");
const popupImageTitle = popupImage.querySelector(".popup-image__title");

function getClone() {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardsElement = cardTemplate.querySelector(".cards__element").cloneNode(true);
  return cardsElement;
}

function createContent() {
  initialCards.forEach(function (item) {
      const cardsElement = getClone();
      cardsElement.querySelector(".cards__title").textContent = item.name;
      cardsElement.querySelector(".cards__image").src = item.link;
      cardsElement.querySelector(".cards__image").alt = item.name;
      cards.append(cardsElement);
      addButtonListener(cardsElement);
      deleteButtonListener(cardsElement);
      contentImageListener(cardsElement);
  });
}

function addContent(evt) {
  evt.preventDefault();
  cardsElement = getClone();
  cardsElement.querySelector(".cards__title").textContent = popupContentPlaceName.value;
  cardsElement.querySelector(".cards__image").src = popupContentImageUrl.value;
  cardsElement.querySelector(".cards__image").alt = popupContentPlaceName.value;
  cards.prepend(cardsElement);
  addButtonListener(cardsElement);
  deleteButtonListener(cardsElement);
  contentImageListener(cardsElement);
  closePopupContent();
}

function editProfile() {
  popupTitle.value = profileTitle.textContent;
  popupSubtitle.value = profileSubtitle.textContent;
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
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
  profileTitle.textContent = popupTitle.value;
  profileSubtitle.textContent = popupSubtitle.value;
  closePopup();
}

function openPopupContent() {
  popupContent.classList.add("popup-content_opened");
}

function addButtonListener(cardItem) {
  const likeButton = cardItem.querySelector(".cards__like");
  likeButton.addEventListener("click", function (evt) {
      evt.target.classList.toggle("cards__like_active");
  });
}

function deleteButtonListener(cardItem) {
  const deleteButton = cardItem.querySelector(".cards__trash");
  deleteButton.addEventListener("click", function () {
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
popupCloseButton.addEventListener("click", closePopup);
popupForm.addEventListener("submit", submitProfile);
contentAddButton.addEventListener("click", openPopupContent);
popupContentCloseButton.addEventListener("click", closePopupContent);
popupContentForm.addEventListener("submit", addContent);
popupImageCloseButton.addEventListener("click", closePopupImage);

createContent();
