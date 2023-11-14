import { useAddLikeToPostMutation } from "../slices/postApiSlice";

const AddLikeButton = ({ postId }) => {
  const [like] = useAddLikeToPostMutation();

  const handleLike = async () => {
    await like({ id: postId })
    setCurrentLikeCount(post.likedBy.length)
  }

  return (
    <button onClick={ handleLike }>
      Like
    </button>
  )
}

export default AddLikeButton