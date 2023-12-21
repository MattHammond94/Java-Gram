import { useDeleteCommentMutation } from "../slices/commentApiSlice";
// Icon:
import { IoTrashSharp } from "react-icons/io5";

const DeleteCommentButton = ({ commentId, handleRemoveComment, refetch }) => {
  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async (e) => {
    e.preventDefault();
    const deletedComment = await deleteComment(commentId);
    if (deletedComment) {
      refetch();
      handleRemoveComment(deletedComment);
    }
  }

  return (
    <IoTrashSharp className="commentIcons" onClick={ (e) => handleDeleteComment(e) }/>
  )
}

export default DeleteCommentButton