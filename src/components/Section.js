export class Section {
  constructor({renderer}, selector) {
    this._container = document.querySelector(selector);
    this._renderer = renderer;

  }

  renderItems(initialArray) {
    initialArray.forEach((item) => {
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
