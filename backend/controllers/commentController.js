import asyncHandler from "express-async-handler";
import Comment from "../models/commentModel.js";
import mongoose from "mongoose";

//Route:     POST /new
//Creates a comment related to a post
const createComment = asyncHandler(async (req, res) => {
  const user = req.user
  const { caption } = req.body

  const comment = await Comment.create({
    caption,
    user
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

  console.log(comment.user._id);
  console.log(user._id);

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

  if (comment.user._id.toString() !== user._id.toString()) {
    res.status(400)
    throw new Error('Cannot delete a comment if user did not post it')
  }

  const deletedComment = await Comment.deleteOne({ _id: id })

  if(deletedComment) {
    res.status(200).json({ message: 'Comment successfully deleted' })
  } else {
    res.status(400)
    throw new Error('Error - Unable to delete this comment')
  }
});

export {
  createComment,
  updateComment,
  deleteComment
}

