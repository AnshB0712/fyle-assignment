import * as model from "./model.js";
import itemsPerPageCounter from "./views/itemsPerPageCounter.js";
import paginationView from "./views/paginationView.js";
import userReposView from "./views/userReposView.js";
import userSearchView from "./views/userSearchView.js";
import userView from "./views/userView.js";

const loadUserData = async (loaderFn, renderFn, dataKey) => {
  renderFn.renderSpinner();
    const additionalParams = (dataKey === 'repos') ? [1, 10] : [];
  try {
    await loaderFn(userSearchView.getQuery(),...additionalParams);
    renderFn.render(model.state[dataKey]);
    paginationView.render(model.state.pagination);
    itemsPerPageCounter.syncData(model.state.pagination);
  } catch (error) {
    renderFn.showErrorMessage(error.message);
  }
};

const loadGithubUser = async () => {
  await loadUserData(model.getUser, userView, "user");
};

const loadGithubUserRepos = async () => {
  await loadUserData(model.getUserRepos, userReposView, "repos");
};
const loadPagination = async (gotoPage) => {
  userReposView.renderSpinner();
  try {
    await model.getUserRepos(userSearchView.getQuery(), gotoPage);
    userReposView.render(model.state.repos);
    paginationView.render(model.state.pagination);
  } catch (error) {
    userReposView.showErrorMessage(error.message);
  }
};

const updateItemsPerPageHandler = async (value) => {
  userReposView.renderSpinner();
  try {
    await model.getUserRepos(userSearchView.getQuery(), 1, value);
    userReposView.render(model.state.repos);
    paginationView.render(model.state.pagination);
  } catch (error) {
    userReposView.showErrorMessage(error.message);
  }
};

const init = () => {
  userSearchView.addHandlerSearch([loadGithubUser, loadGithubUserRepos]);
  paginationView.addHandlerPagination(loadPagination);
  itemsPerPageCounter.addHandlerPerPageCounter(updateItemsPerPageHandler);
};

init();
