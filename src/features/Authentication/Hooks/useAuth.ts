import { LoginRequest, RegisRequest } from "model/auth/auth.model";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { appActions } from "redux/app/app.slice";
import { authActions, onGetUserInfo } from "redux/auth/auth.slice";
import { setToken } from "services/api";
import { loginApi, registerApi } from "services/authApi";

interface IAuth {
  onLogin: () => void;
  onRegister: () => void;
  onChangeForm: (e: boolean) => void;
  onChangeInput: (e: any) => void;
  loginValue: LoginRequest;
  regisValue: RegisRequest;
  isLoginForm: boolean;
  isSusscess: { message: string; status: boolean };
  isNotify: boolean;
}
const initLogin = {
  email: "",
  password: "",
};
const initRegister = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  city: "",
  street: "",
};
const useAuth = (): IAuth => {
  const [loginValue, setLoginValue] = useState<LoginRequest>(initLogin);
  const [regisValue, setRegisValue] = useState<RegisRequest>(initRegister);
  const [isLoginForm, setIsloginForm] = useState<boolean>(true);
  const [isSusscess, setIsSusscess] = useState({ message: "", status: true });
  const [isNotify, setIsNotify] = useState(true);
  const dispatch = useDispatch();

  // handle submit form
  const onChangeForm = (e: boolean) => {
    setIsloginForm(e);
    setIsSusscess({
      message: "",
      status: true,
    });
  };

  const onChangeInput = (e: any) => {
    const { value, name } = e.target;
    isLoginForm
      ? setLoginValue({ ...loginValue, [name]: value })
      : setRegisValue({ ...regisValue, [name]: value });
    setIsSusscess({
      message: "",
      status: true,
    });
    setIsNotify(false);
  };
  const navigate = useNavigate();
  const onLogin = async () => {
    try {
      dispatch(appActions.showLoading());
      const response = loginValue && (await loginApi.postData(loginValue));
      localStorage.setItem(
        "accessToken",
        JSON.stringify(response.data.accessToken)
      );
      dispatch(authActions.setToken(response.data.accessToken));
      setToken(response.data.accessToken);
      onGetUserInfo(dispatch);
      navigate("/");
      setLoginValue(initLogin);
      dispatch(appActions.hideLoading());
    } catch (error) {
      dispatch(appActions.hideLoading());
      setIsSusscess({
        message: "Login failed!",
        status: false,
      });
      setIsNotify(true);
    }
  };

  const onRegister = async () => {
    try {
      dispatch(appActions.showLoading());
      const response = regisValue && (await registerApi.postData(regisValue));
      if (response && response.status === 200) {
        setIsSusscess({
          message: "Registration successful, please login again!",
          status: true,
        });
        setIsNotify(false);
        setRegisValue(initRegister);
        dispatch(appActions.hideLoading());
        setIsloginForm(true);

        // navigate to Login
      }
    } catch (error) {
      dispatch(appActions.hideLoading());
      setIsSusscess({
        message: "Registration failed, please try again!",
        status: false,
      });
      setIsNotify(true);
    }
  };

  return {
    onLogin,
    onRegister,
    isLoginForm,
    onChangeForm,
    onChangeInput,
    loginValue,
    regisValue,
    isSusscess,
    isNotify,
  };
};
export default useAuth;
