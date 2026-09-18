import { uploadImage } from "./cloudinary.service.js";
import { Post as PostModel, PostLike as PostLikeModel, Repost as RepostModel,HiddenPost as HiddenPostModel,SavedPost as SavedPostModel, sequelize } from "../models/index.js";
import { Photo as PhotoModel } from '../models/index.js';
import { ApiError } from '../utils/ApiError.js';
import { Categories } from "../constants/post.js";

export async function createPost(userId: string, images: Express.Multer.File[], category: Categories, caption?: string) {
  const post = await PostModel.create({
    userId,
    category,
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
  await post.increment('repostsCount');
})}

export async function unrepost(postId: string, userId: string) { await sequelize.transaction(async (transaction) => {
  const repost = await RepostModel.findOne({ where: { postId, userId } });
  if (!repost) throw new ApiError(404, 'Repost not found', 'REPOST_NOT_FOUND');

  await repost.destroy();
  await PostModel.increment({ repostsCount: -1 }, { where: { id: postId } });
})}

export async function savePost(postId: string, userId: string) {
  const post = await PostModel.findOne({ where: { id: postId, deletedAt: null } });
  if (!post) throw new ApiError(404, 'Post not found', 'NOT_FOUND');

  const existing = await SavedPostModel.findOne({ where: { postId, userId } });
  if (existing) throw new ApiError(409, 'Post already saved', 'ALREADY_SAVED');

  await SavedPostModel.create({ postId, userId });
}

export async function unsavePost(postId: string, userId: string) {
  const saved = await SavedPostModel.findOne({ where: { postId, userId } });
  if (!saved) throw new ApiError(404, 'Saved post not found', 'SAVED_POST_NOT_FOUND');

  await saved.destroy();
}

export async function hidePost(postId: string, userId: string) {
  const post = await PostModel.findOne({ where: { id: postId, deletedAt: null } });
  if (!post) throw new ApiError(404, 'Post not found', 'NOT_FOUND');

  const existing = await HiddenPostModel.findOne({ where: { postId, userId } });
  if (existing) throw new ApiError(409, 'Post already hidden', 'ALREADY_HIDDEN');

  await HiddenPostModel.create({ postId, userId });
}

export async function unhidePost(postId: string, userId: string) {
  const hidden = await HiddenPostModel.findOne({ where: { postId, userId } });
  if (!hidden) throw new ApiError(404, 'Hidden post not found', 'HIDDEN_POST_NOT_FOUND');

  await hidden.destroy();
}

