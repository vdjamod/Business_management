import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";

const cloudinary_secret = process.env.CLOUDINARY_API_SECRET;
// Configuration
cloudinary.config({
  cloud_name: "dvhzspkb2",
  api_key: "554168747625994",
  api_secret: cloudinary_secret, // Click 'View API Keys' above to copy your API secret
});

async function uplaodOnCloudinary(localPath) {
  if (!localPath) {
    throw new Error("Please Provide file path");
  }

  try {
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(localPath, {
      use_filename: true,
      unique_filename: true,
    });

    fs.unlinkSync(localPath);

    return uploadResult;
  } catch (error) {
    fs.unlinkSync(localPath);
    console.log(error);
  }
}

const deleteFromCloudinary = async (files) => {
  try {
    if (!files || files.length == 0) {
      throw new Error("Pleas Provide path to delelte");
    }
    const result = await cloudinary.api.delete_resources(files);
    if (result) return result;
    return null;
  } catch (error) {
    console.error("Deletion Failed: ", error);
    return null;
  }
};

export { uplaodOnCloudinary, deleteFromCloudinary };
