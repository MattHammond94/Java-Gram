import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetAllUsersPostsQuery, useGetAPostQuery } from "../slices/postApiSlice";
import { useGetSelectedUserInfoQuery } from "../slices/usersApiSlice";
import Loader from "./Loader";
import Modal from "./Modal";

// Icons
import { HiHeart  } from "react-icons/hi";
import { SlSpeech } from "react-icons/sl";
import { IoTrashSharp } from "react-icons/io5";

const UserPageGallery = ({ username }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalOpenStatus, setModalOpenStatus] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const { data: selectedUserInfo, error: selectedUserError, isLoading: selectedUserInfoLoading } = useGetSelectedUserInfoQuery(`${username}`);
  const { data: usersPosts, error: usersPostsError } = useGetAllUsersPostsQuery(selectedUserInfo?._id, {
    skip: !selectedUserInfo
  });

  if (selectedUserInfoLoading) {
    return <Loader />
  }

  if (selectedUserError || usersPostsError) {
    return <div>Error: {selectedUserError.message || usersPostsError.message}</div>;
  }

  const handleSelectedPost = async (post) => {
    setSelectedPost(post)
    setModalOpenStatus(true)
    setModalContent(
      <div className="selectedPostModal">
        <div className="selectedPostImageContainer">
          <img src={ post.image } />
        </div>
        <div className="selectedPostcontentContainer">
          <div className="selectedPostHeader">
            { userInfo.username === username ? <IoTrashSharp className="bin"/> : null }
            <p>{ post.user.username }</p>
          </div>
          <p>{ post.caption }</p>
          <p>Comments:</p>
          <div className="selectedPostLine"></div>
          <div className="commentsContainer">
            {/* { comments.map((comment) => ) } */}
          </div>
          <button className="commentButton">Add Comment</button>
        </div>
      </div>
    )
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
      <Modal status={modalOpenStatus} setStatus={setModalOpenStatus}>
        {modalContent}
      </Modal>
    </>
  )
}

export default UserPageGallery