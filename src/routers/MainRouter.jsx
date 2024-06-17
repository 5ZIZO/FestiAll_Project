import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import Login from "../components/authentication/Login";
import SignUp from "../components/authentication/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <SignUp/>
  }
]);

export default function MainRouter() {
  return <RouterProvider router={router} />;
}
