export default class Section {
    constructor({ renderer }, containerSelector) {

      this._renderer = renderer; // колбек отрисовки карточек
      this._containerSelector = containerSelector; // Селектор контейнера карточек
    }

    renderElements(element) {
      element.forEach((item) => {
        this._renderer(item);
      })
    }

    addItem(item) {
      this._containerSelector.prepend(item)
    }
}