import type { RequestHandler } from 'express';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const requireAdmin: RequestHandler = asyncHandler(async (request, _response, next) => {
  const adminId = request.user?.id;
  if (adminId !== env.adminId) throw new ApiError(403, 'Admin access required', 'FORBIDDEN');
  next();
});