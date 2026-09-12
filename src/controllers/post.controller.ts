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

