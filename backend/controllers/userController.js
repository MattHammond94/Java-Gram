import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// Route:    POST /users/new
const createUser = asyncHandler(async (req, res) => {

  console.log(req.body);

  const { username, email, password } = req.body;

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error('A user already exists with these details');
  }

  const user = await User.create({
    username,
    email,
    password
  });

  res.status(201).json({ message: `User created with username: ${ user.username }` })
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