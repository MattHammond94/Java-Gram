
const AddLikeButton = ({ post }) => {

  const addLike = () => {
    console.log(post);
  }

  return (
    <button onClick={ addLike }>
      Like
    </button>
  )
}

export default AddLikeButton