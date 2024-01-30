class ItemsPerPageView {
  _el = document.querySelector(".number_form");
  _data;
  
  constructor(){
    this.disableOnDecimal()
  }

  syncData(data) {
    this._data = data;
    this._el.querySelector(".number__field").value = this._data.itemsPerPage;
  }
  disableOnDecimal() {
    const numberField = this._el.querySelector(".number__field");
    const submitButton = this._el.querySelector(".sub_btn");

    numberField.addEventListener("input", (e) => {
      const isDecimal = e.target.value.includes('.');
      submitButton.disabled = isDecimal;

      if (isDecimal) {
        submitButton.classList.add("disabled_btn");
      } else {
        submitButton.classList.remove("disabled_btn");
      }
    });
  }
  

  addHandlerPerPageCounter(handler) {
    
    this._el.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const inputValue = formData.get("numberInput");

      if (inputValue < 10 || inputValue > 100) {
        alert("Please enter a valid number between 10 and 100.");
        return;
      }

      handler(inputValue);
    });
  }
}

export default new ItemsPerPageView();
