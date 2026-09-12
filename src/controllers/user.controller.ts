import type { RequestHandler } from 'express';
import * as userService from '../services/user.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import type { UpdateUserInput } from '../validators/user.validators.js';
import { assertAuth } from '../utils/assertions.js';

export const update: RequestHandler = asyncHandler(async (request, response) => {
  const user = assertAuth(request.user);
  const updated = await userService.updateUser(user, request.body as UpdateUserInput);
  response.json({ data: { user: updated.toSafeJSON() } });
});

export const softDelete: RequestHandler = asyncHandler(async (request, response) => {
  const user = assertAuth(request.user);
  await userService.softDeleteUser(user);
  response.status(204).send();
});