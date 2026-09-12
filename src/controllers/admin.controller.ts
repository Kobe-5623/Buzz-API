import type { RequestHandler } from 'express';
import * as adminService from '../services/admin.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { assertUser } from '../utils/assertions.js';

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