import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
  caption: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId, 
    ref: "User",
    required: true
  },
  postId: {
    type: String
  }
},
{
  timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;