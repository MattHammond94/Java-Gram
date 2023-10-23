import asyncHandler from "express-async-handler";

// Route:    POST /users/new
const createUser = asyncHandler(async (req, res) => {
  res.status(201).json({ message: 'User created' })
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