import { useSelector } from "react-redux";
import { useCreatePostMutation } from "../slices/postApiSlice";

const CreatePostButton = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const [newPost, { isLoading }] = useCreatePostMutation();

  const createPost = async () => {
    await newPost({ image: 'An image', caption: 'This was posted through frontend', user: userInfo._id })
    console.log('Post created')
  }

  return (
    <div>
      <button onClick={createPost}>Create Post</button>
    </div>
  )
}

export default CreatePostButton