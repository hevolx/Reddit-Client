import '@testing-library/jest-dom'

// JSDOM does not implement HTMLDialogElement.showModal / close
HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute('open', '');
};
HTMLDialogElement.prototype.close = function () {
  this.removeAttribute('open');
};