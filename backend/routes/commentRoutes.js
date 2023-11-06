import express from 'express';
const router = express.Router();
import { createComment,
  updateComment,
  deleteComment
} from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/new/', protect, createComment);
router.put('/:id', protect, updateComment);
router.delete('/:id', protect, deleteComment);

export default router;