import type { RequestHandler } from 'express';
import * as adminService from '../services/admin.service.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import type { User } from '../models/User.js';
import { User as UserModel } from '../models/index.js';


async function assertUser(userId: string | string[] | undefined): Promise<User> {
  const id = Array.isArray(userId) ? userId[0] : userId;
  const targetUser = await UserModel.findByPk(id);
  if (!targetUser) throw new ApiError(404, 'User not found', 'USER_NOT_FOUND');
  return targetUser;
}

export const forceDelete: RequestHandler = asyncHandler(async (request, response) => {
  const targetUser = await assertUser(request.params.userId);
  await adminService.forceDeleteUser(targetUser);
  response.status(204).send();
});

export const restore: RequestHandler = asyncHandler(async (request, response) => {
  const targetUser = await assertUser(request.params.userId);
  await adminService.restoreUser(targetUser);
  response.status(204).send();
});