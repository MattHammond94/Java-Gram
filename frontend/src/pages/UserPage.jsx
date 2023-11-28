import { useParams } from "react-router-dom";
import { useCheckUsernameQuery } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import NotFoundPage from "../pages/NotFoundPage";
import UserPageHeader from "../components/UserPageHeader";
import UserPageGallery from "../components/UserPageGallery";

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
      <UserPageGallery username={ username }/>
    </div>
  )
}

export default UserPage