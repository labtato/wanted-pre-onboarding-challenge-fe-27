import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // TODO: 로직 추상화
  const token = localStorage.getItem("todo-token");
  if (!token) return <Navigate to="/auth" />;

  return <Outlet />;
};

export default PrivateRoute;
