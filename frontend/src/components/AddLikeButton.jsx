import { useAddLikeToPostMutation } from "../slices/postApiSlice";

const AddLikeButton = ({ postId }) => {
  const [addLike] = useAddLikeToPostMutation();

  const addLikeToPost = async () => {
    await addLike({ id: postId })
  }

  return (
    <button onClick={ addLikeToPost }>
      Like
    </button>
  )
}

export default AddLikeButton