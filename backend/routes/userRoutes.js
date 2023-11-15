import express from 'express';
const router = express.Router();
import {
  createUser,
  logInUser,
  logOutUser,
  getLoggedInUser,
  getASelectedUser,
  addProfilePictureToCloudinary,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/new', createUser);
router.post('/token', logInUser)
router.post('/token/logout', logOutUser);
router.get('/user', protect, getLoggedInUser);
router.get('/:username', protect, getASelectedUser);
router.post('/cloud', protect, addProfilePictureToCloudinary);
router.put('/user', protect, updateUser);
router.delete('/user', protect, deleteUser);

export default router;