import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import PrivatePage from "../pages/PrivatePage";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? <Outlet /> : <PrivatePage />;
}

export default PrivateRoute;