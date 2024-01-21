import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";  // << Will need to re-import useDispatch here
import PrivatePage from "../pages/PrivatePage";

// import { logout } from "../slices/authSlice";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  // const tokenExpiration = localStorage.getItem('tokenExpiry');

  // const isTokenValid = () => {
  //   if (!userInfo || !tokenExpiration) {
  //     return false;
  //   }

  //   const currentTime = new Date().getTime();
  //   const expirationTime = new Date(tokenExpiration).getTime();

  //   return expirationTime > currentTime;
  // };

  // if (!isTokenValid()) {
  //   dispatch(logout());
  //   return <PrivatePage />;
  // }

  return userInfo ? <Outlet /> : <PrivatePage />;
}

export default PrivateRoute;