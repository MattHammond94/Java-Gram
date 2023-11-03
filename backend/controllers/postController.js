import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import mongoose from "mongoose";

//Route:     POST /new
//Creates a post
const createPost = asyncHandler(async (req, res) => {

  const { image, caption, user } = req.body;

  // const existingPost = Post.findOne({ image: image });

  // if (existingPost) {
  //   res.status(400)
  //   throw new Error('This post already exists.')
  // }

  const post = await Post.create({
    image,
    caption,
    user
  });

  if(post) {
    await post.populate("user");

    res.status(201).json({
      _id: post._id,
      user: post.user.username
    });
  } else {
    res.status(400);
    throw new Error('Could not create post');
  }
});


//Route:     GET /:id
//Gets a single post

const getPost = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('Not a valid ID parameter')
  }

  const post = await Post.findOne({ _id: id })

  if (post) {
    await post.populate("user");
    // await post.populate("comments");
    await post.populate("likedBy");
    res.status(200).json(post);
  } else {
    res.status(400)
    throw new Error('Unable to retrieve post - This post has likely been deleted')
  }
});

//Route      GET  /all
//Get all posts
const getAllPosts = asyncHandler(async (req, res) => {
  const allPosts = await Post.find({});

  if (allPosts) {
    const status = res.status(200)
    allPosts.length < 1 ? status.json({ message: 'There are currently no posts' }) : status.json(allPosts)
  } else {
    res.status(400)
    throw new Error('Unable to retrieve posts from the database')
  }
})

//Route:     PUT  /:id
// Updating a caption
// Adding a comment 
// Adding a like 
// Could seperate these into 3 seperate routes (Look into if this is more efficent/user friendly)
const updatePost = asyncHandler(async (req, res) => {
  res.status(201).json({ message: 'Post updated' });
})

//Route:     DELETE  /:id
//Deletes a post
const deletePost = asyncHandler(async (req, res) => {
  res.status(201).json({ message: 'Post deleted' });
})

export {
  createPost,
  getPost,
  getAllPosts,
  updatePost,
  deletePost
}