import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const LogOutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [removeCookie] = useLogoutMutation();

  const logOutFunction = async() => {
    try {
      await removeCookie().unwrap();
      dispatch(logout());
      navigate('/');
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
      <button onClick={ logOutFunction }>Log Out</button>
    </div>
  )
}

export default LogOutButton