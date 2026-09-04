import type { RequestHandler } from 'express';
import * as authService from '../services/auth.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import type { LoginInput, SignupInput } from '../validators/user.validators.js';

export const signup: RequestHandler = asyncHandler(async (request, response) => {
  const result = await authService.signup(request.body as SignupInput);
  response.status(201).json({ data: { token: result.token } });
});

export const login: RequestHandler = asyncHandler(async (request, response) => {
  const result = await authService.login(request.body as LoginInput);
  response.json({ data: { token: result.token } });
});
