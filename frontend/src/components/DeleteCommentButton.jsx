
// Icon:
import { IoTrashSharp } from "react-icons/io5";

const DeleteCommentButton = () => {

  const handleDeleteComment = async () => {
    console.log('comment deleted');
  }

  return (
    <IoTrashSharp className="commentBin" onClick={ () =>  handleDeleteComment }/>
  )
}

export default DeleteCommentButton