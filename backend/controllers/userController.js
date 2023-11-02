import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utilities/generateToken.js";
import tokenCookieRemover from "../middleware/tokenCookieRemover.js";

// Route:    POST /users/new
const createUser = asyncHandler(async (req, res) => {

  const { username, email, password } = req.body;

  const usernameExists = await User.findOne({ username });
  const emailExists = await User.findOne({ email })

  if (usernameExists || emailExists ) {
    res.status(400);
    throw new Error('A user already exists with these details');
  }

  const user = await User.create({
    username,
    email,
    password
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

//Route:      POST /users/token
const logInUser = asyncHandler(async (req, res) => {

  const { username, password } = req.body

  const user = await User.findOne({ username })

  if (user && (await user.matchPasswords(password))) {
    
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

//Route:      POST /users/token/logout
const logOutUser = asyncHandler(async (req, res) => {

  tokenCookieRemover(res);

  res.status(200).json({ message: 'User logged out' })
});

//Route:      GET /users/user
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
});

//Route       PUT /users/user
const updateUser = asyncHandler(async (req, res) => {

  if (req.body.username) {
    const newUsername = req.body.username
    const existingUsername = await User.findOne({ username: newUsername });

    if (existingUsername) {
      res.status(401);
      throw new Error('This username is already in use.')
    }
  }

  if (req.body.email) {
    const newEmail = req.body.email 
    const existingEmail = await User.findOne({ email: newEmail });

    if (existingEmail) {
      res.status(401);
      throw new Error('This email address is already in use.')
    }
  }

  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth
    user.profilePicture = req.body.profilePicture || user.profilePicture
    user.username = req.body.username || user.username
    user.email = req.body.email || user.email
    user.password = req.body.password || user.password
    user.followers = req.body.followers || user.followers
    user.following = req.body.following || user.following

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found')
  }
});

//Route      DELETE /users/user
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if(user) {
    try {
      await User.deleteOne(user);
  
      tokenCookieRemover(res);
  
      res.status(200).json({ message: 'Your account and all related posts have been successfully removed.' });
    } catch(error) {
      res.status(404);
      throw new Error('Unable to delete this account at this moment in time.');
    }
  } else {
    res.status(404);
    throw new Error('Please log in to remove account')
  }
});

export {
  createUser,
  logInUser,
  logOutUser,
  getUser,
  updateUser,
  deleteUser
}