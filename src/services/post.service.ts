import { uploadImage } from "./cloudinary.service.js";
import { Post as PostModel, PostLike as PostLikeModel, Repost as RepostModel, sequelize } from "../models/index.js";
import { Photo as PhotoModel } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';

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

export async function likePost(postId: string, userId: string) { await sequelize.transaction(async (transaction) => {
  const post = await PostModel.findOne({ where: { id: postId, deletedAt: null } });
  if (!post) throw new ApiError(404, 'Post not found', 'NOT_FOUND');

  const existing = await PostLikeModel.findOne({ where: { postId, userId } });
  if (existing) throw new ApiError(409, 'Post already liked', 'ALREADY_LIKED');

  await PostLikeModel.create({ postId, userId });
  await post.increment('likesCount');
})}

export async function unlikePost(postId: string, userId: string) { await sequelize.transaction(async (transaction) => {
  const like = await PostLikeModel.findOne({ where: { postId, userId } });
  if (!like) throw new ApiError(404, 'Like not found', 'NOT_FOUND');

  await like.destroy();
  await PostModel.increment({ likesCount: -1 }, { where: { id: postId } });
})}

export async function repost(postId: string, userId: string) { await sequelize.transaction(async (transaction) => {
  const post = await PostModel.findOne({ where: { id: postId, deletedAt: null } });
  if (!post) throw new ApiError(404, 'Post not found', 'NOT_FOUND');

  const existing = await RepostModel.findOne({ where: { postId, userId } });
  if (existing) throw new ApiError(409, 'Post already reposted', 'ALREADY_REPOSTED');

  await RepostModel.create({ postId, userId });
  await post.increment('repostCount');
})}

export async function unrepost(postId: string, userId: string) { await sequelize.transaction(async (transaction) => {
  const repost = await RepostModel.findOne({ where: { postId, userId } });
  if (!repost) throw new ApiError(404, 'Repost not found', 'REPOST_NOT_FOUND');

  await like.destroy();
  await PostModel.increment({ repostCount: -1 }, { where: { id: postId } });
})}