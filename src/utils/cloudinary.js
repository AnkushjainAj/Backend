import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;  // Early return if no file path provided

        // Upload the file on Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // Log successful upload
        // console.log("File is uploaded on Cloudinary:", response.url);
        fs.unlinkSync(localFilePath)
        
        return response;

    } catch (error) {
        console.error("Failed to upload to Cloudinary:", error);  // Log error if upload fails

        // Check if the file exists before attempting to delete
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);  // Remove the locally saved temporary file
            console.log("Local file deleted successfully");
        }
        
        return null;
    }
}

export { uploadOnCloudinary };
