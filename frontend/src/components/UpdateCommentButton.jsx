import { useState } from "react";
import { useUpdateCommentMutation } from "../slices/commentApiSlice";
import Loader from "./Loader";

const UpdateCommentButton = ({ commentId, caption, setUpdateError, setUpdateCaptionStatus, handleUpdateComment, refetch }) => {
  const [loading, setLoading] = useState(false);
  const [updateComment] = useUpdateCommentMutation();

  const handleCommentUpdate = async(e) => {
    e.preventDefault();

    if(caption.length <= 0) {
      return setUpdateError('Caption cannot be empty');
    }
    
    setUpdateError('');
    setLoading(true);
    const updatedComment = await updateComment({ id: commentId, caption: caption }).unwrap();

    if(updatedComment) {
      handleUpdateComment(updatedComment);
      await refetch();
      setUpdateCaptionStatus(false);
      setLoading(false);
    }
  }

  return (
    <>
      { loading ? <button disabled className="disabledButton"><Loader /></button> : <button onClick={ (e) => handleCommentUpdate(e) }>Update</button> }
    </>
  )
}

export default UpdateCommentButton