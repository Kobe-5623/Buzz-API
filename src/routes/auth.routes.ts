import { Router } from 'express';
import * as controller from '../controllers/auth.controller.js';
import { validateBody } from '../middleware/validate.js';
import { loginSchema, signupSchema } from '../validators/user.validators.js';

export const authRouter = Router();
authRouter.post('/signup', validateBody(signupSchema), controller.signup);
authRouter.post('/login', validateBody(loginSchema), controller.login);
