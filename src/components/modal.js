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
}

function keyHandler(evt) {
  if (evt.key === "Escape") {
    document.querySelectorAll(".popup_is-opened").forEach((item) => {
      closeModal(item);
    });
  }
}

function closeButtonHandler(evt) {
  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup_is-opened")
  ) {
    document.querySelectorAll(".popup_is-opened").forEach((item) => {
      closeModal(item);
    });
  }
}

export { openModal, closeModal };
