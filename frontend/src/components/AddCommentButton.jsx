import { useCreateCommentMutation } from "../slices/commentApiSlice";
import { useAddCommentToPostMutation } from "../slices/postApiSlice";
import { useState } from "react";
import Loader from "./Loader";

const AddCommentButton = ({ selectedPost, caption, setCommentError, refetch, handleNewComment, setCommentValue }) => {
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [createComment] = useCreateCommentMutation();
  const [addCommentToPost] = useAddCommentToPostMutation();

  const handleAddComment = async (e) => {
    e.preventDefault();
    setLoadingStatus(true);

    if(caption.length < 1) {
      setLoadingStatus(false);
      return setCommentError('Comment must have atleast 1 character');
    }

    try {
      const comment = await createComment({ caption: caption, postId: selectedPost._id }).unwrap();
      const addComment = await addCommentToPost({ postId: selectedPost._id, commentId: comment._id });
      if (addComment) {
        setLoadingStatus(false);
        refetch();
        handleNewComment(comment);
        setCommentValue('');
      }
    } catch(err) {
      setCommentError(err.message || err)
    }
  }

  return (
    <>
      { loadingStatus ? <button className="addCommentLoadingBtn" disabled><Loader /></button> : <button className="commentButton" onClick={ (e) => handleAddComment(e) }>Add Comment</button> }
    </>
  )
}

export default AddCommentButton