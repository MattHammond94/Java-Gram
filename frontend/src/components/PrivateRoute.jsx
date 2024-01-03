import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";
import PrivatePage from "../pages/PrivatePage";

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const tokenExpiration = localStorage.getItem('tokenExpiry');
  console.log(tokenExpiration);

  const isTokenValid = () => {
    if (!userInfo || !tokenExpiration) {
      return false;
    }

    const currentTime = new Date().getTime();
    const expirationTime = new Date(tokenExpiration).getTime();

    console.log(currentTime);
    console.log(expirationTime);

    return expirationTime > currentTime;
  };

  if (!isTokenValid()) {
    dispatch(logout());
    return <PrivatePage />;
  }

  return userInfo ? <Outlet /> : <PrivatePage />;
}

export default PrivateRoute;