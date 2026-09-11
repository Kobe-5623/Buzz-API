import { Router } from 'express';
import * as controller from '../controllers/admin.controller.js';
import { authenticate } from '../middleware/authenticate.js';
import { requireAdmin } from '../middleware/requireAdmin.js';

export const adminRouter = Router();
adminRouter.delete('/users/:userId/force-delete', authenticate, requireAdmin, controller.forceDelete);
adminRouter.patch('/users/:userId/restore', authenticate, requireAdmin, controller.restore);