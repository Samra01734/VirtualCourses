
import { v2 as cloudinary } from "cloudinary";
import  fs from 'fs'

const uploadOnCloudinary = async (filePath) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  
  try {
    if (!filePath) {
      return null;
    }
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto'
    });
    
    // Remove the file from local storage after successful upload
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    return uploadResult;
  } catch (error) {
    // Remove the file from local storage if upload fails
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    console.log("Cloudinary Upload Error:", error);
    return null;
  }
}
export default uploadOnCloudinary