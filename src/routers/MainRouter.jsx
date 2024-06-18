import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import MyPage from "../page/MyPage";
import SignUp from "../components/authentication/SignUp";
import Login from "../components/authentication/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
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
