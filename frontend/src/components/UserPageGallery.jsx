import { useState, useEffect } from "react";
import { useGetAllUsersPostsQuery } from "../slices/postApiSlice";
import { useGetSelectedUserInfoQuery } from "../slices/usersApiSlice";
import Loader from "./Loader";
import Modal from "./Modal";
import SelectedPost from "./SelectedPost";

// Icons
import { HiHeart  } from "react-icons/hi";
import { SlSpeech } from "react-icons/sl";

const UserPageGallery = ({ username, updateTotalPosts }) => {
  const [modalOpenStatus, setModalOpenStatus] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [contentLoading, setContentLoading] = useState(false);
  const { data: selectedUserInfo, error: selectedUserError, isLoading: selectedUserInfoLoading } = useGetSelectedUserInfoQuery(`${username}`);
  const { data: usersPosts, error: usersPostsError, refetch } = useGetAllUsersPostsQuery(selectedUserInfo?._id, {
    skip: !selectedUserInfo
  });

  useEffect(() => {
    if (usersPosts) {
      updateTotalPosts(usersPosts.length);
    }
  }, [usersPosts, updateTotalPosts]);

  if (selectedUserInfoLoading) {
    return <Loader />
  }

  if (selectedUserError || usersPostsError) {
    return <div>Error: {selectedUserError.message || usersPostsError.message}</div>;
  }

  const handleSelectedPost = async (post) => {
    setModalOpenStatus(true)
    setModalContent(<SelectedPost post={post} username={username} setModalContent={setModalContent} setModalOpenStatus={setModalOpenStatus} setContentLoading={setContentLoading} refetch={ refetch }/>)
  }

  return (
    <>
      <div className="userPageGallery">
        {usersPosts && usersPosts.map((post) => (
          <div key={post._id} className="galleryPostContainer" onClick={ () => handleSelectedPost(post) }>
            <img src={ post.image } />
            <div className="galleryIconsContainer">
              <div className="galleryLikesContainer">
                <HiHeart className="galleryIcon"/> 
                <p>{ post.likedBy.length }</p>
              </div>
              <div className="galleryCommentsContainer">
                <SlSpeech className="galleryIcon"/>
                <p>{ post.comments.length }</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal status={modalOpenStatus} setStatus={setModalOpenStatus} contentLoading={contentLoading}>
        {modalContent}
      </Modal>
    </>
  )
}

export default UserPageGallery