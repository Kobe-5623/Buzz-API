import type { RequestHandler } from 'express';
import * as userService from '../services/user.service.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import type { UpdateUserInput } from '../validators/user.validators.js';
import { User } from '../models/User.js';

function assertOwner(requestedUser: User | undefined, requestingUserId: string | string[] | undefined) {
  if (!requestedUser) throw new ApiError(401, 'Authentication required', 'UNAUTHORIZED');
  const id = Array.isArray(requestingUserId) ? requestingUserId[0] : requestingUserId;
  if (requestedUser.id !== id) throw new ApiError(403, 'You may only modify your own account', 'FORBIDDEN');
  return requestedUser;
}

export const update: RequestHandler = asyncHandler(async (request, response) => {
  const user = assertOwner(request.user, request.params.id);
  const updated = await userService.updateUser(user, request.body as UpdateUserInput);
  response.json({ data: { user: updated.toSafeJSON() } });
});

export const softDelete: RequestHandler = asyncHandler(async (request, response) => {
  const user = assertOwner(request.user, request.params.id);
  await userService.softDeleteUser(user);
  response.status(204).send();
});