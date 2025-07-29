import { UploadHandler } from 'uploadthing/server';

const uploadthing = new UploadHandler({
  // Configuration for uploadthing
  apiKey: process.env.UPLOADTHING_API_KEY,
  // Other configurations as needed
});

export const handleUpload = async (file: File) => {
  try {
    const result = await uploadthing.upload(file);
    return result;
  } catch (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }
};