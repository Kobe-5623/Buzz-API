import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import { authenticate } from '../middleware/authenticate.js';
import * as controller from '../controllers/post.controller.js'

export const postRouter = Router();
postRouter.post('/', authenticate, upload.array('images'), controller.createPost);
postRouter.post('/:postId/like', authenticate, controller.likePost);
postRouter.delete('/:postId/like', authenticate, controller.unlikePost);
postRouter.post('/:postId/repost', authenticate, controller.repost);
postRouter.delete('/:postId/repost', authenticate, controller.unrepost);
postRouter.post('/:postId/save', authenticate, controller.savePost);
postRouter.delete('/:postId/save', authenticate, controller.unsavePost);
postRouter.post('/:postId/hide', authenticate, controller.hidePost);
postRouter.delete('/:postId/hide', authenticate, controller.unhidePost);
