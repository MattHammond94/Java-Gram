import { useDeletePostMutation, useRemovePostImageFromCloudMutation, useGetAllPostsQuery } from "../slices/postApiSlice";
import { useState } from "react";
import Loader from "./Loader";
import Modal from "./Modal";

// Icon:
import { IoTrashSharp } from "react-icons/io5";

const DeletePostButton = ({ post, setModalContent, setModalOpenStatus, setContentLoading, refetch }) => {
  const [deletePost, { isLoading: deletePostLoading }] = useDeletePostMutation();
  const [deletePostImageFromCloud, { isLoading: deleteFromCloudLoading }] = useRemovePostImageFromCloudMutation();
  const { refetch: refetchAllPosts } = useGetAllPostsQuery();
  const [confirmModalOpenStatus, setConfirmModalOpenStatus] = useState(false);

  const confirmDeletionContent = (
    <div className="confirmModalContainer">
      <div className="confirmModalContentContainer">
        <p>Are you sure you want to delete this post?</p>
        <button onClick={ () => handleDeletePost(post) }>Delete</button>
        <button onClick={ () => setConfirmModalOpenStatus(false) }>Cancel</button>
      </div>
    </div>
  )

  const handleDeletePost = async (post) => {

    setContentLoading(true);
    setConfirmModalOpenStatus(false);
    setModalContent(
      <div className="deletePostContent">
        <Loader variant={'large'}/>
      </div>
    );

    try {
      await deletePost(`${post._id}`);
      await deletePostImageFromCloud({ image: post.imageCloudId});
    } catch (error) {
      setContentLoading(false);
      setModalContent(
        <div className="deletePostContent">
          <h1>Error</h1>
          <p>Unable to delete this post at this moment in time</p>
          <p>Please try again later</p>
        </div>
      );
    }

    await refetch();
    
    setModalContent(
      <div className="deletePostContent">
        <h1>This post was successfully deleted</h1>
      </div>
    );
    
    setContentLoading(false);
    setTimeout(() => {
      setModalOpenStatus(false);
    }, 1500);
  };

  return (
    <>
      <IoTrashSharp className="bin" onClick={ () => setConfirmModalOpenStatus(true) }/>
      <Modal status={confirmModalOpenStatus} setStatus={setConfirmModalOpenStatus} contentLoading={ null } variant={ "confirm" }>
        { confirmDeletionContent }
      </Modal>
    </>
  )
}

export default DeletePostButton