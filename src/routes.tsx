import { RouteObject } from "react-router-dom";
import App from "./App.tsx";
import PageAuth from "./pages/PageAuth.tsx";

const routes: RouteObject[] = [
  { path: "/", element: <App /> },
  {
    path: "/auth",
    element: <PageAuth />,
  },
];

export default routes;
