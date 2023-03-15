let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");
let profileEditButton = document.querySelector(".profile__edit-button");
let popupTitle = document.querySelector('input[name="author_name"]');
let popupSubtitle = document.querySelector('input[name="author_about"]');
let popupSubmitButton = document.querySelector(".popup__submit-button");
let popupCloseButton = document.querySelector(".popup__close-button");
let popup = document.querySelector(".popup");
let popupContainer = document.querySelector(".popup__container");

function editProfile() {
    popupTitle.value = profileTitle.textContent;
    popupSubtitle.value = profileSubtitle.textContent;
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function submitProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupTitle.value;
    profileSubtitle.textContent = popupSubtitle.value;
    closePopup();
}

profileEditButton.addEventListener("click", editProfile);
popupCloseButton.addEventListener("click", closePopup);
popupContainer.addEventListener("submit", submitProfile);