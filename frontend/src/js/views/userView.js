class UserView {
  _parentEl = document.querySelector(".user");
  _data;
  _errorMessage = "Failed to fetch user";

  render(data) {
    this._data = data;
    this._clearParentEl();
    this._parentEl.innerHTML = this._generateMarkup();
  }

  _generateMarkup() {
    return `
      <figure class="user__fig">
        <img src="${this._data?.avatar_url}" alt="${this._data?.name}" class="user__img" />
        <h1 class="user__title">
          <span>${this._data?.login}</span>
        </h1>
      </figure>
      <div class="user__ingredients">
        <h2 class="heading--2">GitHub Info</h2>
        <ul class="user__ingredient-list">
          <li class="user__ingredient">
            <div class="user__quantity">Name:</div>
            <div class="user__description">${this._data?.name}</div>
          </li>
          <li class="user__ingredient">
            <div class="user__quantity">Username:</div>
            <div class="user__description">
              <a class="link" target="_blank" rel="noopener noreferrer" href='https://github.com/${this._data?.login}'>${this._data?.login}</a>
            </div>
          </li>
          <li class="user__ingredient">
            <div class="user__quantity">Followers:</div>
            <div class="user__description">${this._data?.followers}</div>
          </li>
          <li class="user__ingredient">
            <div class="user__quantity">Following:</div>
            <div class="user__description">${this._data?.following}</div>
          </li>
        </ul>
      </div>
    `;
  }

  _clearParentEl() {
    this._parentEl.innerHTML = "";
  }

  renderSpinner() {
    const template = `
      <div class="spinner">
        <svg>
          <use href="/icons.svg#icon-loader"></use>
        </svg>
      </div>`;
    this._clearParentEl();
    this._parentEl.insertAdjacentHTML("afterbegin", template);
  }

  showErrorMessage(msg = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="/icons.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${msg}</p>
      </div>`;
    this._clearParentEl();
    this._parentEl.innerHTML = markup;
  }
}

export default new UserView();
