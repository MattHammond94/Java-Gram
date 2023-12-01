import express from 'express';
const router = express.Router();
import {
  createUser,
  logInUser,
  logOutUser,
  getLoggedInUser,
  getASelectedUser,
  addProfilePictureToCloudinary,
  removeProfilePictureFromCloudinary,
  updateFollowers,
  updateUser,
  deleteUser,
  checkUsernameExists
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/new', createUser);
router.post('/token', logInUser)
router.post('/token/logout', logOutUser);
router.get('/user', protect, getLoggedInUser);
router.get('/:username', protect, getASelectedUser);
router.post('/cloud', protect, addProfilePictureToCloudinary);
router.delete('/cloud', protect, removeProfilePictureFromCloudinary);
router.put('/user', protect, updateUser);
router.put('/follow', protect, updateFollowers)
router.delete('/user', protect, deleteUser);
router.get('/checkUsername/:username', protect, checkUsernameExists)

export default router;