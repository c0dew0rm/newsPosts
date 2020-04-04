import { Router } from 'express';
import PostController from '../controllers/PostContoller';

const router = Router();

router.get('/', PostController.getAllPosts);
router.post('/', PostController.addPost);
router.get('/:id', PostController.getAPost);
router.put('/:id', PostController.updatedPost);
router.delete('/:id', PostController.deletePost);

export default router;