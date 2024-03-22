import cloudinary from "./cloudinary";

const uploadImage = async (imageUrl: any) => {
  try {
    const result = await cloudinary.uploader.upload(imageUrl);
    return result;
  } catch (error) {
    throw new Error("Error uploading image to Cloudinary");
  }
};
export default uploadImage;
