import { Navigate, Outlet } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";

const PrivateRoute = () => {
  // TODO: 로직 추상화
  const token = localStorage.getItem(AUTH_TOKEN);
  if (!token) return <Navigate to="/auth" />;

  return <Outlet />;
};

export default PrivateRoute;
