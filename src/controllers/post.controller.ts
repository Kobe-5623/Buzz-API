import type { RequestHandler } from 'express';
import * as postService from '../services/post.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { assertAuth } from '../utils/assertions.js';

export const createPost: RequestHandler = asyncHandler(async (request, response) => {
  const userId = assertAuth(request.user).id;
  const images = (request.files ?? []) as Express.Multer.File[];
  const caption = request.body.caption;
  const newPost = await postService.createPost(userId, images, caption);
  response.json({ data: { post: newPost } });
});

export const likePost: RequestHandler = asyncHandler(async (request, response) => {
  const userId = assertAuth(request.user).id;
  await postService.likePost(request.params.postId, userId);
  response.json({ data: { message: 'Post liked' } });
});

export const unlikePost: RequestHandler = asyncHandler(async (request, response) => {
  const userId = assertAuth(request.user).id;
  await postService.unlikePost(request.params.postId, userId);
  response.status(204).send();
});