class PaginationView {
  _parentEl = document.querySelector(".pagination");
  _data;

  render(data) {
    this._data = data;
    this._parentEl.innerHTML = this.generateMarkup();
  }

  addHandlerPagination(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest("#pag_btn");
      let gotoPage;

      if (!btn) return;

      if (btn.dataset.goto === "next")
        gotoPage = parseInt(this._data.currentPage) + 1;
      else if (btn.dataset.goto === "prev")
        gotoPage = parseInt(this._data.currentPage) - 1;
      else gotoPage = btn.dataset.goto;

      handler(gotoPage);
    });
  }

  generateMarkup() {
    const buttonArray = Array.from(
      { length: this._data.totalPages },
      (_, index) => index + 1
    );
    const markup = buttonArray
      .map((page) => {
        return `
        <button id="pag_btn" data-goto=${page} class=${
          page === this._data.currentPage ? "active" : ""
        }>${page}</button>
        `;
      })
      .join("");

    return `
    <button id="pag_btn" data-goto="prev" ${
      this._data.currentPage === 1 ? "disabled" : ""
    } class=${
      this._data.currentPage === 1 ? "disabled" : "none"
    }>&laquo;</button> 
    ${markup}
    <button id="pag_btn" data-goto="next" ${
      this._data.currentPage === this._data.totalPages ? "disabled" : ""
    } class=${
      this._data.currentPage === this._data.totalPages ? "disabled" : "none"
    }>&raquo;</button>
      `;
  }
}

export default new PaginationView();
