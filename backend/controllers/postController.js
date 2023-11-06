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
    const status = res.status(200);

    if (allPosts.length < 1) {
      status.json({ message: 'There are currently no posts' });
    }

    const arrayOfPromises = allPosts.map((post) => post.populate("user"));
    
    await Promise.all(arrayOfPromises);

    status.json(allPosts)
    
  } else {
    res.status(400);
    throw new Error('Unable to retrieve posts from the database');
  }
})

//Route:     PUT  /:id/addLike  -  /:id/updateCaption
// Updating a caption
// Adding a comment 
// Adding a like 
const addLikeToPost = asyncHandler(async (req, res) => {
  const user = req.user
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('Not a valid ID parameter')
  }

  const post = await Post.findById(id);

  if (!post) {
    res.status(400)
    throw new Error('Unable to retrieve post at this time')
  }

  const existingLike = post.likedBy.some(userId => userId.toString() === user._id.toString());
  console.log(existingLike);

  if (existingLike) {
    post.likedBy = post.likedBy.filter(userId => userId.toString() !== user._id.toString());
    const likeRemoved = await post.save({ likedBy: post.likedBy });

    if (likeRemoved) {
      const updatedPost = await Post.findById(id)
      console.log(updatedPost.likedBy);
      res.status(200).json(updatedPost);
    } else {
      res.status(400)
      throw new Error('Unable to update post')
    }

  } else {
    post.likedBy.push(user);
    const likeAdded = await post.save({ likedBy: post.likedBy });

    if(likeAdded) {
      const updatedPost = await Post.findById(id)
      console.log(updatedPost.likedBy[0]);
      res.status(200).json(updatedPost);
    } else {
      res.status(400)
      throw new Error('Unable to update post')
    }
  }
});


const updatePostCaption = asyncHandler( async (req, res) => {
  const { caption } = req.body
  const { id } = req.params

  //Handle caption input validation on frontend.

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('Not a valid ID parameter')
  }

  const update = await Post.findOneAndUpdate({ _id: id }, { caption: caption });

  if (update) {
    const updatedPost = await Post.findById(id)
    res.status(200).json(updatedPost);
  } else {
    res.status(400)
    throw new Error('Unable to update post')
  }
});

//Route:     DELETE  /:id
//Deletes a post
const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error('Not a valid ID parameter');
  }

  const deletedPost = await Post.findOneAndDelete({ _id: id });

  if (deletedPost) {
    res.status(200).json({ message: 'Post successfully deleted' })
  } else {
    res.status(400)
    throw new Error('Unable to delete post as post does not exist')
  }
});

export {
  createPost,
  getPost,
  getAllPosts,
  addLikeToPost,
  updatePostCaption,
  deletePost
}