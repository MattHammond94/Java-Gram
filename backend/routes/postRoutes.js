import express from 'express';
const router = express.Router();
import {
  createPost,
  getPost,
  getAllPosts,
  addLikeToPost,
  updatePostCaption,
  deletePost
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

router.get('/all', protect, getAllPosts);
router.post('/new', protect, createPost);
router.get('/:id', protect, getPost);
router.delete('/:id', protect, deletePost);
router.put('/:id/addLike', protect, addLikeToPost);
router.put('/:id/updateCaption', protect, updatePostCaption);

export default router;