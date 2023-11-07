import express from 'express';
const router = express.Router();
import {
  createPost,
  getPost,
  getAllPosts,
  addLikeToPost,
  updatePostCaption,
  addCommentToPost,
  addImageToCloudinary,
  deletePost
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

// Currently don't require Cross Origin Resource Sharing for /cloud endpont.
// If find issues with uploading to cloudinary then add cors just to this route.
// If no issues after deployment the cors package can be uninstalled.
import cors from 'cors';

router.get('/all', protect, getAllPosts);
router.post('/new', protect, createPost);
router.get('/:id', protect, getPost);
router.delete('/:id', protect, deletePost);
router.put('/:id/addLike', protect, addLikeToPost);
router.put('/:id/updateCaption', protect, updatePostCaption);
router.put('/:id/addComment', protect, addCommentToPost);

router.post('/cloud', protect, addImageToCloudinary);

export default router;