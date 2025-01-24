import {
  v2 as cloudinary,
  UploadApiOptions,
  UploadApiResponse,
} from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../config/env.config";
import ErrorApi from "./CustomError";
import { Readable } from "stream";

class Cloudinary {
  constructor() {
    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    });
  }

  async upload(
    file: Buffer,
    option?: UploadApiOptions
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: option?.folder || "Assets",
          resource_type: option?.resource_type || "auto",
        },
        (err, result) => {
          if (err) reject(new ErrorApi(500, "Upload failed."));
          else if (result) resolve(result);
          else reject(new ErrorApi(500, "No result."));
        }
      );
      const readable = new Readable();
      readable.push(file);
      readable.push(null);
      readable.pipe(uploadStream);
    });
  }

  async destroy(
    path: string,
    folder: String = ""
  ): Promise<UploadApiResponse | undefined> {
    const publicId = path.split("/").pop()?.split(".")[0] ?? "";
    try {
      return await cloudinary.uploader.destroy(folder + "/" + publicId);
    } catch (error) {
      throw error;
    }
  }

  async destoryFiles(files: string[], folder: string): Promise<string[]> {
    return await Promise.all(
      files.map((file) => this.destroy(file, folder).then((res) => res?.result))
    );
  }
}

export default new Cloudinary();
