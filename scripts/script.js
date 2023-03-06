let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");
let profileEditButton = document.querySelector(".profile__edit-button");
let contentAddButton = document.querySelector(".profile__add-button");
let profileFormTitle = document.querySelector(".profile-form__input-title");
let profileFormSubtitle = document.querySelector(".profile-form__input-subtitle");
let profileFormSubmitButton = document.querySelector(".profile-form__submit-button");
let profileFormCloseButton = document.querySelector(".profile-form__close-button");
let overlay = document.querySelector(".overlay");
let profileForm = document.querySelector(".profile-form");

function EditProfile() {
    profileFormTitle.value = profileTitle.textContent;
    profileFormSubtitle.value = profileSubtitle.textContent;
    overlay.style.display = "block";
    profileForm.style.display = "block";
}

function CloseProfileForm() {
    overlay.style.display = "none";
    profileForm.style.display = "none";
}

function SubmitProfile() {
    profileTitle.textContent = profileFormTitle.value;
    profileSubtitle.textContent = profileFormSubtitle.value;
    CloseProfileForm();
}

profileEditButton.addEventListener("click", EditProfile);
profileFormCloseButton.addEventListener("click", CloseProfileForm);
profileFormSubmitButton.addEventListener("click", SubmitProfile);
