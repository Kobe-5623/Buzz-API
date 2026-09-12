import type { RequestHandler } from 'express';
import * as postService from '../services/post.service.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/User.js';

function assertOwner(requestedUser: User | undefined, requestingUserId: string | string[] | undefined) {
  if (!requestedUser) throw new ApiError(401, 'Authentication required', 'UNAUTHORIZED');
    const id = Array.isArray(requestingUserId) ? requestingUserId[0] : requestingUserId;
  if (requestedUser.id !== id) throw new ApiError(403, 'You may only modify your own account', 'FORBIDDEN');
  return requestedUser.id;
}

export const createPost: RequestHandler = asyncHandler(async (request, response) => {
  const userId = assertOwner(request.user, request.params.id);
  const images = (request.files ?? []) as Express.Multer.File[];
  const caption = request.body.caption;
  const newPost = await postService.createPost(userId, images, caption);
  response.json({ data: { post: newPost } });
});

