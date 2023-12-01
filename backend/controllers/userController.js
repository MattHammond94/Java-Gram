import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utilities/generateToken.js";
import tokenCookieRemover from "../middleware/tokenCookieRemover.js";
import cloudinary from "../config/cloudinaryConfig.js";
import mongoose from "mongoose";

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
      profilePicture: user.profilePicture,
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
      profilePicture: user.profilePicture,
      email: user.email,
      followers: user.followers,
      following: user.following
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

//Route:      GET /users/checkUsername/:username
const checkUsernameExists = asyncHandler(async (req, res) => {
  const { username } = req.params

  const response = await User.findOne({ username: username });

  if (response) {
    res.status(200).json(true);
  } else {
    res.status(400);
    throw new Error('User does not exist');
  }
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
      profilePictureCloudId : selectedUser.profilePictureCloudId,
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

//Route       Put /users/follow
const updateFollowers = asyncHandler(async (req, res) => {
  const { loggedInUserId, selectedUserId } = req.body

  if (!mongoose.Types.ObjectId.isValid(loggedInUserId) || !mongoose.Types.ObjectId.isValid(selectedUserId)) {
    res.status(400)
    throw new Error('Not a valid ID parameter');
  }

  if (loggedInUserId === selectedUserId) {
    res.status(400)
    throw new Error('User cannot follow themselves');
  }

  const loggedInUser = await User.findById(loggedInUserId);
  const selectedUser = await User.findById(selectedUserId);

  if (!loggedInUser || !selectedUser) {
    res.status(400)
    throw new Error('Unable to locate users at this time.');
  }

  const alreadyFollowingAsIndex = loggedInUser.following.findIndex(userId => userId.toString() === selectedUserId);

  console.log(loggedInUser.following)
  console.log(selectedUser.followers)

  if (alreadyFollowingAsIndex !== -1) {
    loggedInUser.following.splice(alreadyFollowingAsIndex, 1);
    const alreadyFollowedAsIndex = selectedUser.followers.findIndex(userId => userId.toString() === loggedInUser)
    selectedUser.followers.splice(alreadyFollowedAsIndex, 1);
  } else {
    loggedInUser.following.push(selectedUser);
    selectedUser.followers.push(loggedInUser);
  }

  console.log(loggedInUser.following)
  console.log(selectedUser.followers)

  const updatedLoggedInUser = await loggedInUser.save();
  const updatedSelectedUser = await selectedUser.save()

  if (updatedLoggedInUser && updatedSelectedUser) {
    const finalUser = await User.findById(updatedLoggedInUser._id)
    res.status(200).json(finalUser);
  } else {
    res.status(400)
    throw new Error('Unable to update post')
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
    user.profilePictureCloudId = req.body.profilePictureCloudId || user.profilePictureCloudId,
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
  updateFollowers,
  updateUser,
  deleteUser,
  checkUsernameExists
}