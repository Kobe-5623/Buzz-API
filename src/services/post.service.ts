import { uploadImage } from "./cloudinary.service.js";
import { Post as PostModel } from "../models/index.js";
import { Photo as PhotoModel } from '../models/index.js';

export async function createPost(userId: string, images: Express.Multer.File[], caption?: string) {
  const post = await PostModel.create({
    userId,
    caption,
  });

  for (const image of images) {
    const result = await uploadImage(image.buffer);
    await PhotoModel.create({
      postId: post.id,
      url: result.secure_url,
    });
  }

  return post;
}