const mongoose = require("mongoose");

// userAuth Schema
const mediaSchemma = new mongoose.Schema(
  {
    mediaId: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    mediaType: {
      type: String,
      enum: ["movie", "tv"],
      required: true,
    },
    releaseYear: {
      type: Number,
    },
    mediaPhoto: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// media model
const mediaModal = new mongoose.model("media", mediaSchemma);
module.exports = { mediaModal };
