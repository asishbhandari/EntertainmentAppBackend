const {
  connectMongoDb,
  disconnectMongoDb,
} = require("../MongoDb/MongoDbConnection");
const { UserAuthModal } = require("../Modals/userAuthModal");
const bcrypt = require("bcrypt");
const { UserInfoModal } = require("../Modals/userInfoModal");

exports.handleUserSignUp = async (req, res) => {
  try {
    const data = req.body;
    // Connect to the database
    await connectMongoDb();

    // checking if user email already exist
    const isCurrentUser = await UserAuthModal.findOne({ email: data.email });

    if (isCurrentUser) {
      res.status(409).json({
        error: "User already registered",
        message: "A user with the provided email is already registered",
      });
    } else {
      const hash = await bcrypt.hash(data?.password, 10);
      await UserAuthModal.create({
        userName: data.userName,
        email: data.email,
        password: hash,
      });
      await UserInfoModal.create({
        email: data.email,
      });
      res.status(200).json({ message: " user Added to database" });
    }
    // Disconnect from the database
    await disconnectMongoDb();
  } catch (error) {
    console.log("Error in userAuthSignup:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
