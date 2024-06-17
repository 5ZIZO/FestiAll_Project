import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import SignUp from "../components/authentication/SignUp";
import Authentication from "../components/authentication/Authentication";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Authentication/>
  },
  {
    path: "/signup",
    element: <SignUp/>
  }
]);

export default function MainRouter() {
  return <RouterProvider router={router} />;
}
