import { useNavigate } from "react-router-dom";
import { useGetSelectedUserInfoQuery } from "../slices/usersApiSlice";
import Loader from "./Loader";

const UserPageHeader = ({ username }) => {
  const navigate = useNavigate();
  const { data: userInfo, error: userError, isLoading: userInfoLoading } = useGetSelectedUserInfoQuery(`${username}`);

  const handleNavigate = () => {
    navigate('/feed')
  }

  if (userInfoLoading) {
    return <Loader />
  }

  if (userError) {
    return <div>Error: {userError.message}</div>;
  }

  const total = 0

  return (
    <div className='userHeader'>
      <div className='leftSide'>
        <button>Update</button>
        <img src={`${userInfo.profilePicture}`} alt='Users personal profile picture' />
      </div>
      <div className='middle'>
        <div className='middleTop'>
          <h1>{ username }</h1>
        </div>
        <div className='middleMiddle'>
          <div className='posts'>
            <p>{`${total}`}</p>
            <p>Posts</p>
          </div>
          <div className='followers'>
            <p>{`${userInfo.followers.length}`}</p>
            <p>Followers</p>
          </div>
          <div className='Following'>
            <p>{`${userInfo.following.length}`}</p>
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