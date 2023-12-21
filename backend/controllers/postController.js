import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinaryConfig.js";

//Route:     POST /new
//Creates a post
const createPost = asyncHandler(async (req, res) => {
  const { image, imageCloudId, caption, user } = req.body;

  const post = await Post.create({
    image,
    imageCloudId,
    caption,
    user
  });

  if(post) {
    await post.populate("user");

    res.status(201).json(post);
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

    const secondArrayOfPromises = allPosts.map((post) => post.populate("likedBy"));

    await Promise.all(secondArrayOfPromises);

    status.json(allPosts.reverse());
    
  } else {
    res.status(400);
    throw new Error('Unable to retrieve posts from the database');
  }
})

//Route:     GET  /allUsersPosts/:id
//Returns all posts that belong to specific user
const getAllUsersPosts = asyncHandler(async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('Not a valid ID parameter')
  }

  const allUsersPosts = await Post.find({ user: id });

  if (allUsersPosts) {
    if (allUsersPosts.length < 1) {
      return res.status(204).json({ message: 'This user currently has no posts' });
    }

    await Promise.all(allUsersPosts.map(async (post) => await post.populate("user")));
    await Promise.all(allUsersPosts.map(async (post) => await post.populate("likedBy")));
    await Promise.all(
      allUsersPosts.map(async (post) => {
        await post.populate({
          path: 'comments',
          populate: {
            path: 'user',
            model: 'User',
          }
        })
      })
    );

    res.status(200).json(allUsersPosts.reverse());
    
  } else {
    res.status(400);
    throw new Error('Unable to retrieve posts from the database');
  }
})

//ROUTE:     DELETE /allUsersPosts
// Deletes all posts that belong to selected user and removes all from cloud.
const deleteAllUsersPosts = asyncHandler(async (req, res) => {
  const userId = req.user._id

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400)
    throw new Error('Not a valid ID parameter')
  }

  const allUsersPosts = await Post.find({ user: userId });

  if (!allUsersPosts) {
    res.status(400)
    throw new Error('Unable to fetch all posts at this time');
  }

  // Double check the asynchronous nature of the map function in this scenario
  if (allUsersPosts.length > 0) {
    allUsersPosts.map(async (post) => 
      await cloudinary.uploader.destroy(post.imageCloudId,
        (error) => {
          if(error) {
            res.status(400)
            throw new Error(`Error deleting image from cloud: ${error}`);
          }
        }
      )
    );
  } else {
    return res.status(200).json({ message: 'User has no posts to delete.' });
  }

  const allDeletedPosts = await Post.deleteMany({ user: userId });

  if (allDeletedPosts) {
    res.status(200).json({ message: 'All posts deleted successfully' });
  } else {
    res.status(400)
    throw new Error('Unable to delete all posts at this time.');
  }
});

//Route:     PUT  /addLike
//Adding a like 
const addLikeToPost = asyncHandler(async (req, res) => {
  const user = req.user
  const { id } = req.body

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400)
    throw new Error('Not a valid ID parameter')
  }

  const post = await Post.findById(id);

  if (!post) {
    res.status(400)
    throw new Error('Unable to retrieve post at this time')
  }

  const existingLikeAsIndex = post.likedBy.findIndex(userId => userId.toString() === user._id.toString());

  if (existingLikeAsIndex !== -1) {
    post.likedBy.splice(existingLikeAsIndex, 1);
  } else {
    post.likedBy.push(user);
  }

  const update = await post.save();

  if (update) {
    const updatedPost = await Post.findById(id);
    await updatedPost.populate('likedBy');
    res.status(200).json(updatedPost);
  } else {
    res.status(400)
    throw new Error('Unable to update post')
  }
});

//Route:    PUT  /:id/updateCaption
//Update caption
const updatePostCaption = asyncHandler( async (req, res) => {
  const { caption } = req.body
  const { id } = req.params

  //Handle caption input validation on frontend. - Account for empty strings

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

//Route      PUT   /addComment 
//Add a comment to post
const addCommentToPost = asyncHandler(async (req, res) => {
  const { postId, commentId } = req.body

  if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(commentId)) {
    res.status(400)
    throw new Error('Not a valid ID parameter')
  }
  
  const postCommentBelongsTo = await Post.findById({ _id: postId });

  postCommentBelongsTo.comments.push(commentId);

  const commentAddedToPost = await postCommentBelongsTo.save()

  if (commentAddedToPost) { 
    const updatedPost = await Post.findOne({ _id: commentAddedToPost._id })
    await updatedPost.populate('comments');
    res.status(200).json(updatedPost)
  } else {
    res.status(400)
    throw new Error('Error - Unable to add comment to post')
  }
});

//ROUTE      POST /cloud
//Adds image to cloud and returns img URL to be stored in DB

// Can add further adjustments to the transformation array to adjust image further before being stored.
// Will need to first settle on which approach to take with image scale/formatting.
const addImageToCloudinary = asyncHandler(async(req, res) => {
  const { image } = req.body;

  const uploadedImage = await cloudinary.uploader.upload(image,
    { 
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

//Route      DELETE /cloud
//Deletes selected image from cloudinary library
const removeImageFromCloudinary = asyncHandler(async(req, res) => {
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
    const commentIds = deletedPost.comments;
    const deletedComments = await Comment.deleteMany({ _id: { $in: commentIds } });
    if (!deletedComments) {
      res.status(400);
      throw new Error('Error deleting assosciated comments from this post')
    }
    
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
  getAllUsersPosts,
  deleteAllUsersPosts,
  addLikeToPost,
  updatePostCaption,
  addCommentToPost,
  addImageToCloudinary,
  removeImageFromCloudinary,
  deletePost
}