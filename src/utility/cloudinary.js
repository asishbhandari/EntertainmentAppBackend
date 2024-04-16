const cloudinary = require("cloudinary").v2;
const { log } = require("console");
const fs = require("fs");

cloudinary.config({
  cloud_name: "dg9tlxiix", //process.env.CLOUDINARY_CLOUD_NAME,
  api_key: "968455127662212", //process.env.CLOUDINARY_API_KEY,
  api_secret: "gRpBwObcREB3HELI298ojlkJOHY", //process.env.CLOUDINARY_API_SECRET,
});
// need to check why env variables are not working

exports.uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) throw new Error("no local file Path");
    else {
      // console.log(
      //   process.env.CLOUDINARY_API_KEY,
      //   process.env.CLOUDINARY_API_SECRET
      // );
      const response = await cloudinary.uploader.upload(localFilePath);
      // console.log(response);
      return response.secure_url;
    }
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return error;
  }
};
