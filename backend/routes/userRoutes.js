import express from 'express';
const router = express.Router();
import {
  createUser,
  logInUser,
  logOutUser,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/new', createUser);
router.post('/token', logInUser)
router.post('/token/logout', logOutUser);
router.get('/user', protect, getUser);
router.put('/user', protect, updateUser);
router.delete('/user', protect, deleteUser);

export default router;