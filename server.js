const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const cors = require("cors");
const multer = require("multer");

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// for using environment variables
dotenv.config();

app.get("/", (req, res) => {
  res.status(200).json({ message: "working" });
});

app.use("/v1/auth", authRoutes);
app.use("/v1/user", userRoutes);

app.listen(process?.env?.PORT || 4000, () => {
  console.log(`server is listening on Port ${process?.env?.PORT || 4000}`);
});
