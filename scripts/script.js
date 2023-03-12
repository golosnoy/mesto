/* 
Уважаемый ревьюер!
Спасибо за комментарии!
Если у Вас будут замечания касательно этого кода, большая просьба подробно 
написать, что необходимо исправить. 
Функционал привел в соответствие с заданием.
Нужно ли переписывать код по шаблону из задания?
*/

let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");
let profileEditButton = document.querySelector(".profile__edit-button");
let popupTitle = document.querySelector(".popup__input-title");
let popupSubtitle = document.querySelector(".popup__input-subtitle");
let popupSubmitButton = document.querySelector(".popup__submit-button");
let popupCloseButton = document.querySelector(".popup__close-button");
let popup = document.querySelector(".popup");
let popupContainer = document.querySelector(".popup__container");

function EditProfile() {
    popupTitle.value = profileTitle.textContent;
    popupSubtitle.value = profileSubtitle.textContent;
    popup.classList.add('popup_opened');
    popupContainer.classList.add('popup_opened');
}

function ClosePopup() {
    popup.classList.remove('popup_opened');
    popupContainer.classList.remove('popup_opened');
}

function SubmitProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = popupTitle.value;
    profileSubtitle.textContent = popupSubtitle.value;
    ClosePopup();
}

profileEditButton.addEventListener("click", EditProfile);
popupCloseButton.addEventListener("click", ClosePopup);
popupSubmitButton.addEventListener("click", SubmitProfile);