import { UploadApiResponse } from 'cloudinary';
import cloudinary from '../config/cloudinary.js';
import { Readable } from 'node:stream';

export async function uploadImage(buffer: Buffer): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'buzz/posts',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result!);
      }
    );

    Readable.from([buffer]).pipe(stream);
  })
}