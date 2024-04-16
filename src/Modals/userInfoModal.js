const mongoose = require("mongoose");

// userAuth Schema
const userInfoSchemma = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true, // Converts email to lowercase
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // Regex for email validation
    },
    profilePicture: {
      type: String,
    },
    bookmarkedMedia: [
      {
        mediaModalId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "mediaModal", // Reference to the media (movies or TV ) collection
        },
        mediaId: {
          type: Number,
          required: true,
        },
        type: {
          type: String,
          enum: ["movie", "tv"], // Type of the bookmarked media (movie or TV show)
        },
      },
    ],
    billingAddress: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: Number,
    },
  },
  { timestamps: true }
);

// UserInfo model
const UserInfoModal = new mongoose.model("userInfo", userInfoSchemma);
module.exports = { UserInfoModal };
