import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const LogOutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [removeCookie, { isLoading }] = useLogoutMutation();

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
      { isLoading ? <button disabled><Loader /></button> : <button className="logOutButton" onClick={ logOutFunction }>Log Out</button> }
    </div>
  )
}

export default LogOutButton