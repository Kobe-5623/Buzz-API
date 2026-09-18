import { Router } from 'express';
import * as controller from '../controllers/admin.controller.js';
import { authenticate } from '../middleware/authenticate.js';
import { requireRole } from '../middleware/authorization.js';

export const adminRouter = Router();
adminRouter.delete('/users/:userId/force-delete', authenticate, requireRole('admin'), controller.forceDelete);
adminRouter.patch('/users/:userId/restore', authenticate, requireRole('admin'), controller.restore);