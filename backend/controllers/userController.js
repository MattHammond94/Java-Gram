// Route:    POST /users/new
const createUser = (req, res) => {
  res.status(201).json({ message: 'User created' })
}

//Route POST /users/token
const logInUser = (req, res) => {
  res.status(200).json({ message: 'User logged in' })
}

//Route POST /users/token/logout
const logOutUser = (req, res) => {
  res.status(200).json({ message: 'User logged out' })
}

//Route GET /users/user
const getUser = (req, res) => {
  res.status(200).json({ message: 'User returned' })
}

//Route PATCH /users/user
const updateUser = (req, res) => {
  res.status(201).json({ message: 'User updated' })
}

export {
  createUser,
  logInUser,
  logOutUser,
  getUser,
  updateUser
}