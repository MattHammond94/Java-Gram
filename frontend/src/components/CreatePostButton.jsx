import { useSelector } from "react-redux";

const CreatePostButton = () => {
  const { userInfo } = useSelector((state) => state.auth)

  const createPost = () => {
    console.log('Post created');
  }

  return (
    <div>
      <button onClick={createPost}>Create Post</button>
    </div>
  )
}

export default CreatePostButton