import { useParams } from "react-router-dom";
import { useGetSelectedUserInfoQuery } from "../slices/usersApiSlice";
import Loader from "../components/Loader";

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
  const { username } = useParams();
  const { data, error, isLoading} = useGetSelectedUserInfoQuery(`${username}`);

  // const getUserData = async() => {

  //   const res = await getData({ username: username }).unwrap();
  
  //   console.log(res);
  // }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(data)

  return (
    <div>
      <h1>{ username }</h1>
      <button>Update Profile Picture</button>
      <img src={`${data.profilePicture}`} alt='Users personal profile picture' />
      <p>{`${data.followers.length} Followers`}</p>
      <p>{`${data.following.length} Following`}</p>

    </div>
  )
}

export default UserPage