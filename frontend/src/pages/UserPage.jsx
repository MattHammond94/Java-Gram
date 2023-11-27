import { useParams } from "react-router-dom";
import { useCheckUsernameQuery } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import NotFoundPage from "../pages/NotFoundPage";
import UserPageHeader from "../components/UserPageHeader";
import UserPageGallery from "../components/UserPageGallery";

// Will consist of two components - A header and a gallery

// Gallery will contain: 
// a gallery of thumbnails from all that specific users Posts 
// each image is selectable and showcases a larger version of it.
// IF user is logged in they can delete their image here
// On delete image will need to also be deleted from the cloud library so will need to implement backend for this.

// IF the user selected(":id" in req params/link) === current users ID then extra elements will be rendered to this page 
// Extra elements will be a drop down menu that includes updating info.


const UserPage = () => {
  const { username } = useParams();
  const { data: userExists, error: userExistsError, isLoading: userExistsLoading } = useCheckUsernameQuery(`${username}`);

  if (userExistsLoading) {
    return <Loader />
  }

  if (userExists !== true) {
    return <NotFoundPage />
  }

  if (userExistsError) {
    return <div>Error: {userExistsError.message}</div>;
  }

  return (
    <div>
      <UserPageHeader username={ username }/>
      <UserPageGallery />
    </div>
  )
}

export default UserPage