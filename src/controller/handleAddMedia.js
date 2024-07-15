const {
  connectMongoDb,
  // disconnectMongoDb,
} = require("../MongoDb/MongoDbConnection");
const { mediaModal } = require("../Modals/mediaModal");

exports.handleAddMedia = async (req, res, next) => {
  try {
    const mediaInfo = req.body;
    // console.log(mediaInfo);
    // console.log("handle media k andar", typeof mediaInfo.mediaId);
    // await connectMongoDb();
    const isMediaAdded = await mediaModal.findOne({
      mediaId: mediaInfo.mediaId,
    });
    if (isMediaAdded) {
      req.mediaModalId = isMediaAdded.id;
      req.mediaType = isMediaAdded.mediaType;
      req.mediaId = isMediaAdded.mediaId;
      req.mediaPhoto = isMediaAdded.mediaPhoto;
      console.log("media already exist");
      next();
    } else {
      const result = await mediaModal.create({
        mediaId: mediaInfo.mediaId,
        title: mediaInfo.title,
        mediaType: mediaInfo.mediaType,
        mediaPhoto: mediaInfo.mediaPhoto,
        releaseYear: mediaInfo.releaseYear,
      });
      req.mediaModalId = result.id;
      req.mediaType = result.mediaType;
      req.mediaId = result.mediaId;

      console.log("new media added");
      next();
    }
    // await disconnectMongoDb();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: " internal Server error" });
    // await disconnectMongoDb();
  }
};
