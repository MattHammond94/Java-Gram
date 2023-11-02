import express from 'express';
const router = express.Router();
import {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  deletePost
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

router.get('/all', protect, getAllPosts);
router.post('/new', protect, createPost);
router.get('/:id', protect, getPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);

export default router;