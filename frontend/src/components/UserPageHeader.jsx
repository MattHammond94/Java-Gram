import { useNavigate } from "react-router-dom";
import { useGetSelectedUserInfoQuery } from "../slices/usersApiSlice";
import Loader from "./Loader";
import UpdateProfilePictureButton from "./UpdateProfilePictureButton";
import { useSelector } from "react-redux";

const UserPageHeader = ({ username }) => {
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
          <div className='Following'>
            <p>{`${selectedUserInfo.following.length}`}</p>
            <p>Following</p>
          </div>
        </div>
      </div>
      <div className='rightSide'>
        <button onClick={ handleNavigate }>Home</button>
        <button>Settings</button>
        <button>Create Post</button>
      </div>
    </div>
  )
}

export default UserPageHeader