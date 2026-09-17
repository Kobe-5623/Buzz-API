import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import { authenticate } from '../middleware/authenticate.js';
import * as controller from '../controllers/post.controller.js'

export const postRouter = Router();
postRouter.post('/', authenticate, upload.array('images'), controller.createPost);
postRouter.post('/:postId/like', authenticate, controller.likePost);
postRouter.delete('/:postId/like', authenticate, controller.unlikePost);