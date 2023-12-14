import { useParams } from "react-router-dom";
import { useState } from "react";
import { useCheckUsernameQuery } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import NotFoundPage from "../pages/NotFoundPage";
import UserPageHeader from "../components/UserPageHeader";
import UserPageGallery from "../components/UserPageGallery";

const UserPage = () => {
  const { username } = useParams();
  const [totalPosts, setTotalPosts] = useState(0);
  const { data: userExists, error: userExistsError, isLoading: userExistsLoading } = useCheckUsernameQuery(`${username}`);

  const handleUpdateTotalPosts = (count) => {
    setTotalPosts(count);
  };

  if (userExistsLoading) {
    return <Loader variant={'large'}/>
  }

  if (userExists !== true) {
    return <NotFoundPage />
  }

  if (userExistsError) {
    return <div>Error: {userExistsError.message}</div>;
  }

  return (
    <div className="userPage">
      <UserPageHeader username={ username } totalPosts={ totalPosts }/>
      <UserPageGallery username={ username } updateTotalPosts={ handleUpdateTotalPosts } />
    </div>
  )
}

export default UserPage