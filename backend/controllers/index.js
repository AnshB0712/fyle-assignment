const axios = require("axios");

const getUserInfo = async (req, res) => {
  const { username } = req.params;
  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${username}`
    );
    res.status(200).json({ ...data });
  } catch (error) {
    throw error;
  }
};

const getUserRepos = async (req, res) => {
  const { username } = req.params;
  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedData = data.slice(startIndex, endIndex);

    const totalPages = Math.ceil(data.length / pageSize);

    const metadata = {
      totalItems: data.length,
      currentPage: page,
      itemsPerPage: pageSize,
      totalPages: totalPages,
    };

    res.status(200).json({ data: paginatedData, metadata });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserInfo,
  getUserRepos,
};
