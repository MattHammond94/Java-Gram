import { useUpdateCommentMutation } from "../slices/commentApiSlice";

const UpdateCommentButton = ({ commentId, caption, setUpdateError, setUpdateCaptionStatus, handleUpdateComment, refetch }) => {
  const [updateComment] = useUpdateCommentMutation();

  const handleCommentUpdate = async(e) => {
    e.preventDefault();

    if(caption.length <= 0) {
      return setUpdateError('Caption cannot be empty');
    }

    const updatedComment = await updateComment({ id: commentId, caption: caption });

    if(updatedComment) {

      console.log(updatedComment);
      console.log(updatedComment.data);

      handleUpdateComment(updatedComment.data);
      await refetch();
      setUpdateCaptionStatus(false);
    }
  }

  return (
    <button onClick={ (e) => handleCommentUpdate(e) }>Update</button>
  )
}

export default UpdateCommentButton