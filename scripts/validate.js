const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inputErrorSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
      const inputList = Array.from(formElement.querySelectorAll(inputSelector));
      const buttonElement = formElement.querySelector(submitButtonSelector);
      inputList.forEach((inputElement) => {
        const errorElement = formElement.querySelector(`${inputErrorSelector}_${inputElement.id}`);
        setEventListeners(inputElement, inputList, buttonElement, errorElement, rest);
        });
  });
};

const setEventListeners = (inputElement, inputList, buttonElement, errorElement, {...rest}) => {
  inputElement.addEventListener("input", () => {
      isValid(inputElement, errorElement, rest);
      toggleButtonState(inputList, buttonElement, rest);
});
};

const isValid = (inputElement, errorElement, {...rest}) => {
  if (!inputElement.validity.valid) {
      showInputError(inputElement, errorElement, inputElement.validationMessage, rest);
  } else {
      hideInputError(inputElement, errorElement, rest);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
  } else {
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
  }
};

const showInputError = (inputElement, errorElement, errorMessage, {inputErrorClass, spanErrorClass}) => {
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(spanErrorClass);
};

const hideInputError = (inputElement, errorElement, {inputErrorClass, spanErrorClass}) => {
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(spanErrorClass);
    errorElement.textContent = "";
};
