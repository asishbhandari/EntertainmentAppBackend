const express = require("express");
const { verifyToken } = require("../middleware/userAuth");
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

router.get("/info", verifyToken, handleUserInfo);
router.patch("/update", verifyToken, handleUserUpdate);
router.patch(
  "/updatePhoto",
  verifyToken,
  upload.single("profilePicture"),
  handleProfilePhoto
);
router.post("/bookmark", verifyToken, handleAddMedia, handleUserBookmark);
router.get("/bookmarkedMedia", verifyToken, handleGetBookmarkedMedia);
module.exports = router;
