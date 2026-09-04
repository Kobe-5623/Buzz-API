import type { RequestHandler } from 'express';
import * as userService from '../services/user.service.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import type { UpdateUserInput } from '../validators/user.validators.js';

export const update: RequestHandler = asyncHandler(async (request, response) => {
  const user = request.user;
  if (!user) throw new ApiError(401, 'Authentication required', 'UNAUTHORIZED');
  const updated = await userService.updateUser(user, request.body as UpdateUserInput);
  response.json({ data: { user: updated.toSafeJSON() } });
});

export const deactivate: RequestHandler = asyncHandler(async (request, response) => {
  const user = request.user;
  if (!user) throw new ApiError(401, 'Authentication required', 'UNAUTHORIZED');
  await userService.deactivateUser(user);
  response.status(204).send();
});
