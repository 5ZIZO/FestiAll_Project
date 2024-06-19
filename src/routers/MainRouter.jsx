import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import MyPage from "../page/MyPage";
import SignUp from "../components/authentication/SignUp";
import Login from "../components/authentication/Login";
import DetailPage from "../page/DetailPage";
import DefaultLayout from "../layouts/DefaultLayout";
import Introduction from "../components/authentication/Introduction";

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      // 여기에 각자 페이지 연결해주시면 됩니다!
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/detail/:festId", element: <DetailPage /> },
      { path: "/introduction", element: <Introduction /> },
      { path: "/mypage", element: <MyPage /> },
    ]
  }
]);

export default function MainRouter() {
  return <RouterProvider router={router} />;
}
