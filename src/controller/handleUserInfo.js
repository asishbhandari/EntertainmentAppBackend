const { UserInfoModal } = require("../Modals/userInfoModal");
const {
  connectMongoDb,
  disconnectMongoDb,
} = require("../MongoDb/MongoDbConnection");

exports.handleUserInfo = async (req, res) => {
  try {
    // await connectMongoDb();
    const user = req.user;
    const userInfo = await UserInfoModal.find({ email: user.email });
    res.status(200).json(userInfo);
    // await disconnectMongoDb();
  } catch (error) {
    console.log("Error in userAuthLogin:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
