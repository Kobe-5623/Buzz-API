import { Router } from 'express';
import * as controller from '../controllers/user.controller.js';
import { authenticate } from '../middleware/authenticate.js';

export const userRouter = Router();
userRouter.patch('/me', authenticate, controller.update);
userRouter.delete('/me/soft-delete', authenticate, controller.softDelete);
userRouter.post('/:userId/block', authenticate, controller.blockUser);
userRouter.delete('/:userId/block', authenticate, controller.unblockUser);