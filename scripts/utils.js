export const popupImage = document.querySelector(".popup_image");
export const popupImageImg = popupImage.querySelector(".popup__image");
export const popupImageTitle = popupImage.querySelector(".popup__image-title");

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupByPressEsc);
  popup.addEventListener("click", closePopupByClickOverlay);
}

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupByPressEsc);
  popup.removeEventListener("click", closePopupByClickOverlay);
}

export function closePopupByPressEsc(evt) {
  if (evt.key === "Escape") {
      const popupOpened = document.querySelector(".popup_opened");
      closePopup(popupOpened);
  }
}

export function closePopupByClickOverlay(evt) {
  if (evt.target === evt.currentTarget) {
      closePopup(evt.target);
  }
}
