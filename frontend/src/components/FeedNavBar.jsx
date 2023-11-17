import { useSelector } from "react-redux";
import LogOutButton from "./LogOutButton";
import { useNavigate } from "react-router-dom";
import { useGetSelectedUserInfoQuery } from "../slices/usersApiSlice";
import Loader from "./Loader";

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
      <img  onClick={ handleNavigate } src={`${selectedUserInfo.profilePicture}`} alt="Users profile picture" />
      <h1>{ selectedUserInfo.username }</h1>
      <LogOutButton />
    </div>
  )
}

export default FeedNavBar