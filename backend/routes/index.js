const { getUserInfo, getUserRepos } = require("../controllers");

const userRouter = require("express").Router();

userRouter.get("/:username", getUserInfo);
userRouter.get("/repos/:username", getUserRepos);

module.exports = userRouter;
