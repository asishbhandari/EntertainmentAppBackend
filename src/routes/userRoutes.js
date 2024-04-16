const express = require("express");
const { verfiyToken } = require("../middleware/userAuth");
const { handleUserInfo } = require("../controller/handleUserInfo");
const {
  handleUserUpdate,
  handleUserBookmark,
  handleProfilePhoto,
  handleGetBookmarkedMedia,
} = require("../controller/handleUserUpdate");
const { handleAddMedia } = require("../controller/handleAddMedia");
const { upload } = require("../middleware/multer");

const router = express.Router();

// new route to update user info

router.get("/info", verfiyToken, handleUserInfo);
router.patch("/update", verfiyToken, handleUserUpdate);
router.patch(
  "/updatePhoto",
  verfiyToken,
  upload.single("profilePicture"),
  handleProfilePhoto
);
router.post("/bookmark", verfiyToken, handleAddMedia, handleUserBookmark);
router.get("/bookmarkedMedia", verfiyToken, handleGetBookmarkedMedia);
module.exports = router;
