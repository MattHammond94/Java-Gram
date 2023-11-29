import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetSelectedUserInfoQuery } from "../slices/usersApiSlice";
import Loader from "./Loader";
import CreatePostButton from "./CreatePostButton";

const FeedNavBar = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { data: selectedUserInfo, isLoading: userInfoLoading } = useGetSelectedUserInfoQuery(userInfo.username);

  const handleNavigate = () => {
    navigate(`/user/${userInfo.username}`);
  }

  if (userInfoLoading) {
    return <Loader />;
  }

  return (
    <div className='feedNavBar'>
      <img 
        onClick={ handleNavigate } 
        src={`${selectedUserInfo.profilePicture}`} 
        alt="Users profile picture" 
        className="navbarProfilePicture"
      />
      <CreatePostButton />
    </div>
  )
}

export default FeedNavBar