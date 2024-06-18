import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../page/Home";
import MyPage from "../page/MyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
  /*

    임시 입니다.

    

    위와 같이 해서 필요한 라우트 부분 추가해주시면 감사하겠습니다. -동신
  */
]);

export default function MainRouter() {
  return <RouterProvider router={router} />;
}
