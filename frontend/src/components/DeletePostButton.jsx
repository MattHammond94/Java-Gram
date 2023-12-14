import { useDeletePostMutation, useRemovePostImageFromCloudMutation, useGetAllPostsQuery } from "../slices/postApiSlice";
import Loader from "./Loader";

// Icon:
import { IoTrashSharp } from "react-icons/io5";

const DeletePostButton = ({ post, setModalContent, setModalOpenStatus, setContentLoading, refetch }) => {
  const [deletePost, { isLoading: deletePostLoading }] = useDeletePostMutation();
  const [deletePostImageFromCloud, { isLoading: deleteFromCloudLoading }] = useRemovePostImageFromCloudMutation();
  const { refetch: refetchAllPosts } = useGetAllPostsQuery();

  const handleDeletePost = async (post) => {
    
    //Open a new Modal to confirm delete

    const deletedPost = await deletePost(`${post._id}`)
  
    setContentLoading(true);
  
    if (!deletedPost) {
      return setModalContent(
        <div className="modalError">
          <h1>Error</h1>
          <p>Unable to delete this post at this moment in time</p>
          <p>Please try again later</p>
        </div>
      )
    }
  
    await deletePostImageFromCloud({ image: post.imageCloudId})
  
    await refetch();
  
    if(deletePostLoading || deleteFromCloudLoading) {
      setModalContent(
        <div className="deletePostContent">
          <Loader />
        </div>
      )
    } else {
      setModalContent(
        <div className="deletePostContent">
          <h1>This post was successfully deleted</h1>
        </div>
      )
    }
  
    await refetchAllPosts();
  
    setContentLoading(false);
  
    setTimeout(() => {
      setModalOpenStatus(false);
    }, 1500);
  }

  return (
    <IoTrashSharp className="bin" onClick={ () => handleDeletePost(post) }/>
  )
}

export default DeletePostButton