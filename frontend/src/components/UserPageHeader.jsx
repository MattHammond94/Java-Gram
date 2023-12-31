import { useState } from "react";
import { useGetSelectedUserInfoQuery } from "../slices/usersApiSlice";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import CreatePostButton from "./CreatePostButton";
import UpdateProfilePictureButton from "./UpdateProfilePictureButton";
import OpenModalButton from "./OpenModalButton";
import Modal from "./Modal";
import SettingsList from "./SettingsList";
import FollowButton from "./FollowButton";
import UserList from "./UserList";

// Icons
import { IoHome } from "react-icons/io5";
import { FaCog } from "react-icons/fa";

const UserPageHeader = ({ username, totalPosts }) => {
  const [modalOpenStatus, setModalOpenStatus] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [contentLoading, setContentLoading] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { data: selectedUserInfo, error: selectedUserError, isLoading: selectedUserInfoLoading, refetch } = useGetSelectedUserInfoQuery(`${username}`);

  const usernameCheck = () => {
    return userInfo.username === username
  }

  if (selectedUserInfoLoading) {
    return <Loader />
  }

  if (selectedUserError) {
    return <div>Error: {selectedUserError.message}</div>;
  }

  const openModal = (variant) => {
    setModalOpenStatus(true)
    setModalContent(<UserList username={ username } variant={ variant }/>)
  }

  return (
    <>
      <div className='userHeader'>
        <div className='leftSide'>
          { usernameCheck() && <UpdateProfilePictureButton /> }
          <img src={`${selectedUserInfo.profilePicture}`} alt='Users personal profile picture' />
        </div>
        <div className='middle'>
          <div className='middleTop'>
            <h1>{ username }</h1>
            <p>{ selectedUserInfo.bio }</p>
            <div className="userHeaderLine"></div>
            { !usernameCheck() && <FollowButton username={ username } selectedUserInfo={ selectedUserInfo } refetch={ refetch }/> }
          </div>
          <div className='middleMiddle'>
            <div className='posts'>
              <p>{`${totalPosts}`}</p>
              <p>Posts</p>
            </div>
            <div className='followers' onClick={ () => openModal('followers') }>
              <p>{`${selectedUserInfo.followers.length}`}</p>
              <p>Followers</p>
            </div>
            <div className='following' onClick={ () => openModal('following') }>
              <p>{`${selectedUserInfo.following.length}`}</p>
              <p>Following</p>
            </div>
          </div>
        </div>
        <div className='rightSide'>
          <a href="/feed" className="firstButton"><IoHome className="homeIcon" /></a>
          { usernameCheck() && <OpenModalButton
            buttonContent={ <FaCog className="cogIcon" /> }  
            modalContent={ <SettingsList setModalContent={ setModalContent } setContentLoading={ setContentLoading } setModalOpenStatus={ setModalOpenStatus } refetch={ refetch } /> } 
            setModalContent={ setModalContent }
            setModalOpenStatus={ setModalOpenStatus }
          /> }
          { usernameCheck() && <CreatePostButton className="rightSideCreateBtn" /> }
        </div>
      </div>
      <Modal status={modalOpenStatus} setStatus={setModalOpenStatus} contentLoading={contentLoading}>
        { modalContent }
      </Modal>
    </>
  )
}

export default UserPageHeader