export class Section {
  constructor({ data, renderer }, selector) {
    this._initialArray = data;
    this._container = document.querySelector(selector);
    this._renderer = renderer;
  }

  renderItems() {
    this._renderer(this._initialArray);
  }

  addItem(element) {
    this._container.append(element.generateCard());
  }
};
