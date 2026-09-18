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
  await postService.likePost(request.params.postId as string, userId);
  response.json({ data: { message: 'Post liked' } });
});

export const unlikePost: RequestHandler = asyncHandler(async (request, response) => {
  const userId = assertAuth(request.user).id;
  await postService.unlikePost(request.params.postId as string, userId);
  response.status(204).send();
});

export const repost: RequestHandler = asyncHandler(async (request, response) => {
  const userId = assertAuth(request.user).id;
  await postService.repost(request.params.postId as string, userId);
  response.json({ data: { message: 'Post reposted' } });
});

export const unrepost: RequestHandler = asyncHandler(async (request, response) => {
  const userId = assertAuth(request.user).id;
  await postService.unrepost(request.params.postId as string, userId);
  response.status(204).send();
});

export const savePost: RequestHandler = asyncHandler(async (request, response) => {
  const userId = assertAuth(request.user).id;
  await postService.savePost(request.params.postId as string, userId);
  response.json({ data: { message: 'Post saved' } });
});

export const unsavePost: RequestHandler = asyncHandler(async (request, response) => {
  const userId = assertAuth(request.user).id;
  await postService.unsavePost(request.params.postId as string, userId);
  response.status(204).send();
});

export const hidePost: RequestHandler = asyncHandler(async (request, response) => {
  const userId = assertAuth(request.user).id;
  await postService.hidePost(request.params.postId as string, userId);
  response.json({ data: { message: 'Post hidden' } });
});

export const unhidePost: RequestHandler = asyncHandler(async (request, response) => {
  const userId = assertAuth(request.user).id;
  await postService.unhidePost(request.params.postId as string, userId);
  response.status(204).send();
});

