import AuthPage from "features/Authentication/Component/AuthPage";
import BlogPage from "features/Post/component/BlogPage";
import Profile from "features/Post/component/profile/Profile";

export const ROUTE_LIST = [
  {
    protected: false,
    path: "/login",
    element: <AuthPage />,
  },
  {
    protected: true,
    path: "/",
    element: <BlogPage />,
  },
  {
    protected: true,
    path: "/profile",
    element: <Profile />,
  },
];
