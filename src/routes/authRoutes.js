const express = require("express");
const { handleUserSignUp } = require("../controller/handleUserSignUp");
const { handleUserLogin } = require("../controller/handleUserLogin");
const { verfiyToken } = require("../middleware/userAuth");

const router = express.Router();

router.post("/signup", handleUserSignUp);
router.post("/login", handleUserLogin);
// new route to update user info

// router.get("/", verfiyToken, (req, res) => {
//   res.send("/v1 -- route is working");
// });

module.exports = router;
