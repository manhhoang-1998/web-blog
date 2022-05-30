import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import BlogPage from "./pages/blog-page/BlogPage";
import AuthPage from "./pages/Auth-page/AuthPage";
import PostDetail from "./pages/post-detail/PostDetail";

const routes = [
  {
    path: "/",
    element: <AuthPage />,
  },
  {
    path: "/blog",
    element: <BlogPage />,
  },
  {
    path: "/post",
    element: <PostDetail />,
  },
];

function App() {
  return (
    <div className="App">
      <Routes>
        {routes.map((route) => {
          return <Route path={route.path} element={route.element}></Route>;
        })}
      </Routes>
    </div>
  );
}

export default App;
