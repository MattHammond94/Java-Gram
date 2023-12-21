import asyncHandler from "express-async-handler";
import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";
import mongoose from "mongoose";

//Route:     POST /new
//Creates a comment related to a post
const createComment = asyncHandler(async (req, res) => {
  const user = req.user
  const { caption, postId } = req.body

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400)
    throw new Error('Not a valid ID parameter')
  }

  const comment = await Comment.create({
    caption,
    user,
    postId
  });

  if (comment) {
    await comment.populate("user");
    res.status(201).json(comment);
  } else {
    res.status(400)
    throw new Error('Failed to create comment')
  }
});

//Route     PUT /:id
//Updates a comment
const updateComment = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { caption } = req.body
  const user = req.user

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('Not a valid ID parameter')
  }

  const comment = await Comment.findOne({ _id: id });

  if (comment.user._id.toString() !== user._id.toString()) {
    res.status(400)
    throw new Error('Cannot update a comment if user did not post it')
  }

  comment.caption = caption

  const updatedCaption = await comment.save();

  if (updatedCaption) {
    const updatedComment = await Comment.findOne({ _id: updatedCaption._id })
    res.status(200).json(updatedComment);
  } else {
    res.status(400)
    throw new Error('Unable to update this comment')
  }
});

//Route    DELETE /:id
//Deletes a comment
const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params
  const user = req.user

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('Not a valid ID parameter')
  }

  const comment = await Comment.findOne({ _id: id });
  
  if (!comment) {
    res.status(400);
    throw new Error('Error fetching comment');
  }

  if (comment.user._id.toString() !== user._id.toString()) {
    res.status(400)
    throw new Error('Cannot delete a comment if user did not post it');
  }

  const postId = comment.postId;
  const deletedComment = await Comment.deleteOne({ _id: id });
  const updatedPost = await Post.findOneAndUpdate(
    { _id: postId },
    { $pull: { comments: id } },
    { new: true }
  );

  if (deletedComment && updatedPost) {
    res.status(200).json(id);
  } else {
    res.status(400)
    throw new Error('Error - Unable to delete this comment');
  }
});

// ROUTE     DELETE /all
// Deletes all comments which belong to req.user
const deleteAllUsersComments = asyncHandler(async (req, res) => {
  const user = req.user;

  const deletedComments = await Comment.deleteMany({ user: user });

  if(deletedComments) {
    res.status(200).json({ message: 'All comments have been successfully deleted.' })
  } else {
    res.status(400)
    throw new Error('Error - Unable to delete all users comments at this stage.')
  }
});

export {
  createComment,
  updateComment,
  deleteComment,
  deleteAllUsersComments
}

