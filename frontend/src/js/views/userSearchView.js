class SearchView {
  _parentEl = document.querySelector(".search");

  getQuery() {
    const q = this._parentEl.querySelector(".search__field").value;
    return q;
  }

  clearInput() {
    this._parentEl.querySelector(".search__field").value = "";
  }

  addHandlerSearch(handlers) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handlers.forEach((cb) => cb());
    });
    this.clearInput();
  }
}

export default new SearchView();
