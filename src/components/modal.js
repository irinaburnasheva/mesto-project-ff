function openModal(element) {
  element.classList.add("popup_is-animated");
  element.offsetWidth;
  element.classList.add("popup_is-opened");

  document.addEventListener("keydown", keyHandler);
  document.addEventListener("click", closeButtonHandler);
}

function closeModal(element) {
  element.classList.remove("popup_is-animated");
  element.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", keyHandler);
  document.removeEventListener("click", closeButtonHandler);
}

function keyHandler(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

function closeButtonHandler(evt) {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup_is-opened")
  ) {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

export { openModal, closeModal };
