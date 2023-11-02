import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema({
  image: {
    type: String,
    required: true,
    // unique: true
  },
  caption: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId, 
    ref: "User",
    required: true
  },
  comments: [{
    type: Schema.Types.ObjectId, 
    ref: "Comment",
    default: []
  }],
  likedBy: [{
    type: Schema.Types.ObjectId, 
    ref: "User",
    default: []
  }]
},
{
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

export default Post;