require("dotenv").config();
require("express-async-errors");

const cors = require("cors");
const express = require("express");
const userRouter = require("./routes");
const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_ORIGIN],
  })
);

app.use(express.json());

app.use("/user", userRouter);

app.use("*", (req, res) => {
  res.status(404).json({
    message: "Route not found.",
  });
});

app.use((err, req, res, next) => {
  if (err.name === "AxiosError") {
    return res
      .status(err.response?.data?.responseCode ?? err.response?.status)
      .json({ message: err.response?.data?.message });
  }

  res.status(500).json({
    error: err.data,
    message: "Something went wrong!" + err.message,
  });
});

app.listen(3000, () => console.log("Server running on 3000"));
