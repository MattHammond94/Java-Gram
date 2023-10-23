import express from 'express';
const router = express.Router();
import {
  createUser,
  logInUser,
  logOutUser,
  getUser,
  updateUser
} from '../controllers/userController.js';

router.post('/new', createUser);
router.post('/token', logInUser)
router.post('/token/logout', logOutUser);
router.get('/user', getUser);
router.patch('/user', updateUser)

export default router;