import { API_URL } from "./config";

export const state = {
  query: "",
  user: {},
  repos: [],
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
  },
};

export const getUser = async (user) => {
  if (!user) return;

  try {
    const res = await fetch(`${API_URL}${user}`);
    const data = await res.json();

    if (!res.ok)
      throw new Error(data?.message ?? "Error occured while fetching User");

    state.user = data;
    
  } catch (error) {
    throw error;
  }
};

export const getUserRepos = async (
  user,
  page = state.pagination.currentPage,
  pageSize = state.pagination.itemsPerPage
) => {
  if (!user) return;
  
  console.log(page,pageSize)

  try {
    const res = await fetch(
      `${API_URL}repos/${user}?page=${page}&pageSize=${pageSize}`
    );
    const data = await res.json();

    if (!res.ok)
      throw new Error(
        data?.message ?? "Error occured while fetching User Repos"
      );

    state.repos = data.data;
    state.pagination = data.metadata;
    
  } catch (error) {
    throw error;
  }
};
