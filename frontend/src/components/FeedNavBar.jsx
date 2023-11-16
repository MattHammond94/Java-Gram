import { useSelector } from "react-redux";
import LogOutButton from "./LogOutButton";
import { useNavigate } from "react-router-dom";

const FeedNavBar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/user/${userInfo.username}`);
  }

  return (
    <div className='feedNavBar'>
      <img  onClick={ handleNavigate } src={`${userInfo.profilePicture}`} alt="Users profile picture" />
      <h1>{ userInfo.username }</h1>
      <LogOutButton />
    </div>
  )
}

export default FeedNavBar