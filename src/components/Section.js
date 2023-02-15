export default class Section {
    constructor({ items, renderer }, containerSelector) {
      this._items = items;
      this._renderer = renderer; // колбек отрисовки карточек
      this._containerSelector = containerSelector; // Селектор контейнера карточек
    }

    renderElements() {
      this._items.forEach((item) => {
        this._renderer(item);
      })
    }

    addItem(item) {
      this._containerSelector.prepend(item)
    }
}