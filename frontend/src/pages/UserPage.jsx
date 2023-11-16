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
  const { data: userInfo, error: userError, isLoading: userInfoLoading } = useGetSelectedUserInfoQuery(`${username}`);

  const { data: userExists } = useCheckUsernameQuery(`${username}`);

  console.log(userInfo);
  console.log(userExists);

  if (userExists !== true) {
    return <NotFoundPage />
  }

  if (userInfoLoading) {
    return <Loader />;
  }

  if (userError) {
    return <div>Error: {userError.message}</div>;
  }

  const handleNavigate = () => {
    navigate('/feed')
  }

  return (
    <div>
      <h1>{ username }</h1>
      <button>Update Profile Picture</button>
      <img src={`${userInfo.profilePicture}`} alt='Users personal profile picture' />
      <p>{`${userInfo.followers.length} Followers`}</p>
      <p>{`${userInfo.following.length} Following`}</p>
      <button onClick={ handleNavigate }>Home</button>
    </div>
  )
}

export default UserPage