import { AxiosProgressEvent, AxiosResponse } from "axios";
import { baseApi } from "../axios";

export const uploadChunks = async (
  file: File,
  onProgressCallback?: (chunkIndex: number, chunkProgress: number, totalChunks: number) => void
): Promise<any> => {
  const chunkSize = 50 * 1024 * 1024; // Sets the size of each chunk
  const totalChunks = Math.ceil(file.size / chunkSize); // Calculates how many chunks are needed to upload the file

  try {
    const initiateResponse: AxiosResponse = await baseApi.post("/media-upload/initiate", {
      file_name: file.name,
      content_type: file.type,
    }); // starts the upload process

    const { upload_id: uploadId, key } = initiateResponse.data?.data; //Extracts the upload_id (unique identifier for the upload) and key (a server-provided identifier for the file) from the server’s response.

    // Create upload Promises for Each Chunk
    const chunkPromises = Array.from({ length: totalChunks }, (_, index) => {
      const start = index * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end); // extract the chunk.

      // if (chunk.size < chunkSize && index !== totalChunks - 1) {
      //   throw new Error(`Chunk ${index + 1} is too small. Minimum size is ${chunkSize} bytes.`);
      // }

      const formData = new FormData();
      formData.append("chunk", chunk);
      formData.append("upload_id", uploadId);
      formData.append("key", key);
      formData.append("chunk_number", (index + 1).toString());

      // Send each chunk to the server with its metadata
      return baseApi.post("/media-upload/upload-chunk", formData, {
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          // Calculates the percentage (chunkProgress) of the chunk uploaded.
          const chunkProgress = Math.round(
            (progressEvent.loaded / (progressEvent.total || 1)) * 100
          );
          onProgressCallback?.(index, chunkProgress, totalChunks);
        },
      });
    });

    await Promise.all(chunkPromises);

    const res = await baseApi.post("/media-upload/complete-upload", {
      upload_id: uploadId,
      file_name: file.name,
      total_chunks: totalChunks,
      key,
    });

    const image_url = res.data.data?.url || "";

    return image_url;
  } catch (error) {
    console.error("Error during chunk media-upload error");
    throw error;
  }
};
