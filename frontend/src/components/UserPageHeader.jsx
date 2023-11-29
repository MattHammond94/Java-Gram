import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetSelectedUserInfoQuery } from "../slices/usersApiSlice";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import CreatePostButton from "./CreatePostButton";
import UpdateProfilePictureButton from "./UpdateProfilePictureButton";
import OpenModalButton from "./OpenModalButton";
import Modal from "./Modal";
import SettingsList from "./SettingsList";

// Icons
import { IoHome } from "react-icons/io5";
import { FaCog } from "react-icons/fa";

const UserPageHeader = ({ username }) => {
  const [modalOpenStatus, setModalOpenStatus] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [contentLoading, setContentLoading] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: selectedUserInfo, error: selectedUserError, isLoading: selectedUserInfoLoading } = useGetSelectedUserInfoQuery(`${username}`);

  const handleNavigate = () => {
    navigate('/feed')
  }

  if (selectedUserInfoLoading) {
    return <Loader />
  }

  if (selectedUserError) {
    return <div>Error: {selectedUserError.message}</div>;
  }

  const total = 0

  return (
    <>
      <div className='userHeader'>
        <div className='leftSide'>
          { userInfo.username === username ? <UpdateProfilePictureButton /> : null }
          <img src={`${selectedUserInfo.profilePicture}`} alt='Users personal profile picture' />
        </div>
        <div className='middle'>
          <div className='middleTop'>
            <h1>{ username }</h1>
            {/* Follow button goes here */}
          </div>
          <div className='middleMiddle'>
            <div className='posts'>
              <p>{`${total}`}</p>
              <p>Posts</p>
            </div>
            <div className='followers'>
              <p>{`${selectedUserInfo.followers.length}`}</p>
              <p>Followers</p>
            </div>
            <div className='following'>
              <p>{`${selectedUserInfo.following.length}`}</p>
              <p>Following</p>
            </div>
          </div>
        </div>
        <div className='rightSide'>
          <button onClick={ handleNavigate }><IoHome /></button>
          { userInfo.username === username ?  <OpenModalButton 
            buttonContent={ <FaCog /> }  
            modalContent={ <SettingsList /> } 
            setModalContent={ setModalContent }
            setModalOpenStatus={ setModalOpenStatus }
          /> : null }
          { userInfo.username === username ? <CreatePostButton className="rightSideCreateBtn" /> : null }
        </div>
      </div>
      <Modal status={modalOpenStatus} setStatus={setModalOpenStatus} contentLoading={contentLoading}>
        { modalContent }
      </Modal>
    </>
  )
}

export default UserPageHeader