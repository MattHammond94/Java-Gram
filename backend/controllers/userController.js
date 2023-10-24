import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

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
  res.status(200).json({ message: 'User logged in' })
});

//Route:      POST /users/token/logout
const logOutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'User logged out' })
});

//Route:      GET /users/user
const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'User returned' })
});

//Route       PATCH /users/user
const updateUser = asyncHandler(async (req, res) => {
  res.status(201).json({ message: 'User updated' })
});

export {
  createUser,
  logInUser,
  logOutUser,
  getUser,
  updateUser
}