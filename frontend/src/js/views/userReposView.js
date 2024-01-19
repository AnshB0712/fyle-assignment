class UserReposView {
  _parentEl = document.querySelector(".repos");
  _data;
  _errorMessage = "Failed to fetch user repos";

  render(data) {
    this._data = data;
    this._clearParentEl();

    const reposContainer = this._parentEl.closest(".repos_container");

    if (reposContainer) {
      reposContainer.style.display = "block";
    }

    this._parentEl.innerHTML = this._generateMarkup();
  }

  _generateMarkup() {
    const markup = this._data.map(
      (repo) => `
      <figure class="repos_fig">
        <a target="_blank" rel="noopener noreferrer" href="${repo.html_url}">
          <h2 class="heading--3">${repo.name}</h2>
        </a>
        <p>Description: ${repo.decription ?? "Not Available"}</p>
        <div class="repos_topics">
          ${
            repo.topics.length
              ? `${repo.topics
                  .map((t) => `<span class="topic_pill">${t}</span>`)
                  .join("")}`
              : "<p>Topics: Not Available</p>"
          }
        </div>
      </figure>`
    );
    return markup.join("");
  }

  _clearParentEl() {
    this._parentEl.innerHTML = "";
  }

  renderSpinner() {
    const template = `<div class="spinner">
      <svg>
        <use href="/icons.svg#icon-loader"></use>
      </svg>
    </div>`;
    this._clearParentEl();
    this._parentEl.insertAdjacentHTML("afterbegin", template);
  }

  showErrorMessage(msg = this._errorMessage) {
    const markup = `<div class="error">
      <div>
        <svg>
          <use href="/icons.svg#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${msg}</p>
    </div>`;
    this._parentEl.innerHTML = markup;
  }
}

export default new UserReposView();
