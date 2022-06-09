import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { onGetUserInfo } from "redux/auth/auth.slice";
import { ROUTE_LIST } from "routers/router";
import { setToken } from "services/api";
import "./assets/global/style.scss";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (token) {
      setToken(JSON.parse(token || "{}"));
      onGetUserInfo(dispatch);
    }
  }, [token]);

  const PrivateRoute: FC<any> = ({ children }: any) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <Routes>
        {ROUTE_LIST.map((route, index) => {
          return route.protected ? (
            <Route
              key={index}
              path={route.path}
              element={<PrivateRoute>{route.element}</PrivateRoute>}
            ></Route>
          ) : (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            ></Route>
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
