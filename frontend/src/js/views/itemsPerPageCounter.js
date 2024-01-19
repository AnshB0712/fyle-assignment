class ItemsPerPageView {
  _el = document.querySelector(".number_form");
  _data;

  syncData(data) {
    this._data = data;
    this._el.querySelector(".number__field").value = this._data.itemsPerPage;
  }

  addHandlerPerPageCounter(handler) {
    this._el.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const inputValue = formData.get("numberInput");

      if (inputValue < 10 || inputValue > 100 || inputValue.includes(".")) {
        alert("Please enter a valid number between 10 and 100 (no decimals).");
        return;
      }

      handler(inputValue);
    });
  }
}

export default new ItemsPerPageView();
