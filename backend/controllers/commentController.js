import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import mongoose from "mongoose";

//Route:     POST /new
//Creates a comment related to a post
const createComment = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Comment added' });
});

//Route     PUT /:id
//Updates a comment
const updateComment = asyncHandler(async (req, res) => {
  console.log('Comment updated');
});

//Route    DELETE /:id
//Deletes a comment
const deleteComment = asyncHandler(async (req, res) => {
  console.log('Comment deleted');
});

export {
  createComment,
  updateComment,
  deleteComment
}

