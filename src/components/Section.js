export class Section {
  constructor({ data, renderer }, selector) {
    this._initialArray = data;
    this._container = document.querySelector(selector);
    this._renderer = renderer;
  }

  renderItems() {
    this._initialArray.forEach((item) => {
      this._renderer(item);
  })
}

  addItem(element) {
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element);
  }
};
