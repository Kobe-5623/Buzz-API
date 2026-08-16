import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';
import { ApiError } from '../utils/ApiError.js';

export const validateBody = (schema: ZodType): RequestHandler => (request, _response, next) => {
  const result = schema.safeParse(request.body);
  if (!result.success) {
    next(new ApiError(400, 'Validation failed', 'VALIDATION_ERROR', result.error.flatten()));
    return;
  }
  // Express deliberately types request.body as any; validation makes this assignment safe.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  request.body = result.data;
  next();
};
