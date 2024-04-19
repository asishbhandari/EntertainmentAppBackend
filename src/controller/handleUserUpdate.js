const { mediaModal } = require("../Modals/mediaModal");
const { UserInfoModal } = require("../Modals/userInfoModal");
const {
  connectMongoDb,
  disconnectMongoDb,
} = require("../MongoDb/MongoDbConnection");
const { uploadOnCloudinary } = require("../utility/cloudinary");

exports.handleProfilePhoto = async (req, res) => {
  try {
    await connectMongoDb();
    const user = req?.user;
    const url = await uploadOnCloudinary(req.file.path);
    if (user.email !== req.body.email) {
      res
        .status(409)
        .json({ error: "email id must be same as logged in user" });
    }
    //  update the database with the updated userInfo
    else {
      const result = await UserInfoModal.findOneAndUpdate(
        { email: user.email },
        { profilePicture: url }
      );
      res.status(201).json({
        profilePicture: url,
        message: "database Updated",
      });
    }
    await disconnectMongoDb();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    await disconnectMongoDb();
  }
};

exports.handleUserUpdate = async (req, res) => {
  try {
    await connectMongoDb();
    const user = req?.user;
    const billingAddress = {
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      zipCode: req.body.zipCode,
    };
    const updatedInfo = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      billingAddress: billingAddress,
    };
    if (user.email !== req.body.email) {
      res
        .status(409)
        .json({ error: "email id must be same as logged in user" });
    }
    //  update the database with the updated userInfo
    else {
      const result = await UserInfoModal.findOneAndUpdate(
        { email: user.email },
        updatedInfo
      );
      res.status(201).json({
        // profilePicture: updatedInfo.profilePicture,
        message: "database Updated",
      });
    }
    await disconnectMongoDb();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    await disconnectMongoDb();
  }
};
exports.handleGetBookmarkedMedia = async (req, res) => {
  try {
    const bookmarkedMedia = req?.body;
    await connectMongoDb();
    const mediaResponse = [];

    // Use map to create an array of promises
    const mediaPromises = bookmarkedMedia.map(async (mediaId) => {
      const media = await mediaModal.findOne({
        mediaId: mediaId,
      });
      return media;
    });

    // Wait for all promises to resolve
    const mediaArray = await Promise.all(mediaPromises);

    // Add all resolved media to mediaResponse
    mediaResponse.push(...mediaArray);
    res.status(200).json({ mediaResponse: mediaResponse });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
    await disconnectMongoDb();
  }
};

exports.handleUserBookmark = async (req, res) => {
  try {
    const mediaModalId = req?.mediaModalId;
    const mediaType = req?.mediaType;
    const mediaId = req?.mediaId;
    const user = req?.user;

    await connectMongoDb();
    // getting refrence of the user from database
    const result = await UserInfoModal.findOne({ email: user.email });

    // const updatedMedia = await UserInfoModal.findOneAndUpdate(
    //   { email: user.email },
    //   {
    //     $addToSet: {
    //       bookmarkedMedia: { mediaId, type: mediaType },
    //     },
    //     $pull: {
    //       bookmarkedMedia: { mediaId, type: mediaType },
    //     },
    //   },
    //   { new: true, upsert: false }
    // );

    // cheking if id is already bookmarked
    const isBookmarked = result.bookmarkedMedia.findIndex(
      (media) => media.mediaModalId.toString() === mediaModalId
    );

    // if already added then remove it if not then add it
    if (isBookmarked === -1) {
      result.bookmarkedMedia.push({
        mediaModalId,
        mediaId: mediaId,
        type: mediaType,
      });
    } else {
      result.bookmarkedMedia.splice(isBookmarked, 1);
    }
    // save the updated user
    await result.save();
    res.status(201).json({
      bookmarkedMedia: result.bookmarkedMedia,
      message: "database Updated",
    });
    await disconnectMongoDb();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
    await disconnectMongoDb();
  }
};
