const { UserAuthModal } = require("../Modals/userAuthModal");
const {
  connectMongoDb,
  // disconnectMongoDb,
} = require("../MongoDb/MongoDbConnection");
const bcrypt = require("bcrypt");
const { generateToken } = require("../middleware/userAuth");

exports.handleUserLogin = async (req, res) => {
  try {
    const data = req.body;
    // Connect to the database
    // await connectMongoDb();

    // checking if user email already exist
    const isCurrentUser = await UserAuthModal.findOne({ email: data.email });
    if (isCurrentUser) {
      const match = await bcrypt.compare(data.password, isCurrentUser.password);
      if (match) {
        const token = generateToken(isCurrentUser);
        res.status(200).json({
          access_token: `Bearer ${token}`,
          email: isCurrentUser.email,
        });
      } else
        res.status(404).json({ message: "user Credential does not match" });
    } else {
      res.status(400).json({
        error: "User not registered",
        message: "You need to register this email id with us first",
      });
    }

    // Disconnect from the database
    // await disconnectMongoDb();
  } catch (error) {
    console.log("Error in userAuthLogin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
