const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// need to check why env variables are not working

exports.uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) throw new Error("no local file Path");
    else {
      const response = await cloudinary.uploader.upload(localFilePath);
      return response.secure_url;
    }
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return error;
  }
};
