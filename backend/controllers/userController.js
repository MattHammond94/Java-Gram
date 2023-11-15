import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utilities/generateToken.js";
import tokenCookieRemover from "../middleware/tokenCookieRemover.js";
import cloudinary from "../config/cloudinaryConfig.js";

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
const getLoggedInUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
});

//Route:      GET /users/:username
const getASelectedUser = asyncHandler(async (req, res) => {

  // Will add logic here if/when only following users can view said user profile.

  const { username } = req.params

  const selectedUser = await User.findOne({ username: username });

  if(selectedUser) {
    res.status(200).json({
      _id: selectedUser._id,
      profilePicture: selectedUser.profilePicture,
      username: selectedUser.username,
      followers: selectedUser.followers,
      following: selectedUser.following,
    });
  } else {
    res.status(400);
    throw new Error('This user does not exist.');
  }
});

//ROUTE      POST /cloud
//Adds profilePicture to Cloud and returns img URL to be stored in DB.
const addProfilePictureToCloudinary = asyncHandler(async(req, res) => {
  const { image } = req.body;

  const uploadedImage = await cloudinary.uploader.upload(image,
    { 
      folder: 'Java-Gram/Profile Pictures',
      upload_preset: 'unsigned_uploads',
      allowed_formats: ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
      transformation: [ 
        {crop: "scale"},
        {quality: "auto"},
        {fetch_format: "auto"}
      ],
     },
    (error) => {
      if(error) {
        res.status(400)
        throw new Error(`Error: ${error}`)
      }
    }
  );

  if(uploadedImage) {
    res.status(200).json({
      url: uploadedImage.secure_url,
      id: uploadedImage.public_id
    });
  } else {
    res.status(400)
    throw new Error('Unable to store image in cloud')
  }
});

//ROUTE      DELETE /cloud
//Removes a profilePicture from Cloudinary.
const removeProfilePictureFromCloudinary = asyncHandler(async(req, res) => {
  const { image } = req.body;

  const removedImage = await cloudinary.uploader.destroy(image,
    (error) => {
      if(error) {
        res.status(400)
        throw new Error(`Error: ${error}`)
      }
    }
  );

  if(removedImage) {
    res.status(200).json({ message: 'Image successfully removed from the cloud' });
  } else {
    res.status(400)
    throw new Error('Unable to remove image from the cloud')
  }
});


//Route       PUT /users/user
const updateUser = asyncHandler(async (req, res) => {

  if (req.body.username) {
    const newUsername = req.body.username
    const existingUsername = await User.findOne({ username: newUsername });

    if (existingUsername) {
      res.status(401);
      throw new Error('This username is already in use.');
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
  getLoggedInUser,
  getASelectedUser,
  addProfilePictureToCloudinary,
  removeProfilePictureFromCloudinary,
  updateUser,
  deleteUser
}