import express from 'express';
const router = express.Router();
import { createComment } from '../controllers/commentController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/new', protect, createComment);

export default router;