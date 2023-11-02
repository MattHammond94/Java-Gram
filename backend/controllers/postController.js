import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";

//Route:     POST /posts/new
const createPost = asyncHandler(async (req, res) => {

  const { image, caption, user } = req.body;

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

export {
  createPost
}