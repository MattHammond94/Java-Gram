import { useParams } from "react-router-dom";
import { useGetSelectedUserInfoQuery, useCheckUsernameQuery } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";

// Will consist of two components - A header and a gallery

// Header will contain:
// profile image (a picture that when selected)
// List of followers
// List of following
// Button to follow/unfollow
// A home button that redirects to the feed

// Gallery will contain: 
// a gallery of thumbnails from all that specific users Posts 
// each image is selectable and showcases a larger version of it.
// IF user is logged in they can delete their image here
// On delete image will need to also be deleted from the cloud library so will need to implement backend for this.


// IF the user selected(":id" in req params/link) === current users ID then extra elements will be rendered to this page 
// Extra elements will be a drop down menu that includes updating info.


const UserPage = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const { data: userExists, error: userExistsError, isLoading: userExistsLoading } = useCheckUsernameQuery(`${username}`);
  const { data: userInfo, error: userError, isLoading: userInfoLoading } = useGetSelectedUserInfoQuery(`${username}`);

  if (userExistsLoading || userInfoLoading) {
    return <Loader />
  }

  if (userExists !== true) {
    return <NotFoundPage />
  }

  if (userError || userExistsError) {
    return <div>Error: {userError.message || userExists.error}</div>;
  }

  const handleNavigate = () => {
    navigate('/feed')
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

export default UserPage