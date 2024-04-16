const mongoose = require("mongoose");

// userAuth Schema
const userAuthSchemma = new mongoose.Schema({
  // userName: {
  //   type: String,
  //   required: true,
  //   trim: true,
  // },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true, // Converts email to lowercase
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // Regex for email validation
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default value is the current date/time
  },
});

// UserAuth model
const UserAuthModal = new mongoose.model("userAuth", userAuthSchemma);
module.exports = { UserAuthModal };
