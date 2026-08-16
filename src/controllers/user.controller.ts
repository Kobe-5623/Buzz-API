import type { RequestHandler } from 'express';
import * as userService from '../services/user.service.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import type { UpdateUserInput } from '../validators/user.validators.js';

function assertOwner(requestUserId: number, parameter: string | string[] | undefined): void {
  const id = Array.isArray(parameter) ? parameter[0] : parameter;
  if (requestUserId !== Number(id)) throw new ApiError(403, 'You may only modify your own account', 'FORBIDDEN');
}

export const update: RequestHandler = asyncHandler(async (request, response) => {
  const user = request.user;
  if (!user) throw new ApiError(401, 'Authentication required', 'UNAUTHORIZED');
  assertOwner(user.id, request.params.id);
  const updated = await userService.updateUser(user, request.body as UpdateUserInput);
  response.json({ data: { user: updated.toSafeJSON() } });
});

export const deactivate: RequestHandler = asyncHandler(async (request, response) => {
  const user = request.user;
  if (!user) throw new ApiError(401, 'Authentication required', 'UNAUTHORIZED');
  assertOwner(user.id, request.params.id);
  await userService.deactivateUser(user);
  response.status(204).send();
});
