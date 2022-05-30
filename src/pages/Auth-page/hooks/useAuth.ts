import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginRequest, RegisRequest } from "../../../model/login";
import { setToken } from "../../../services/api";
import { loginApi, registerApi } from "../../../services/authApi";

interface IAuth {
  onLogin: () => void;
  onRegister: () => void;
  onChangeForm: (e: boolean) => void;
  isLogin: boolean;
  onChangeInput: (e: any) => void;
  loginValue: LoginRequest;
  regisValue: RegisRequest;
  isSusscess: { message: string; status: boolean };
  isNotify: boolean;
}
const useAuth = (): IAuth => {
  const [isLogin, setIslogin] = useState<boolean>(true);
  const [loginValue, setLoginValue] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [regisValue, setRegisValue] = useState<RegisRequest>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    city: "",
    street: "",
  });
  const [isSusscess, setIsSusscess] = useState({ message: "", status: true });
  const [isNotify, setIsNotify] = useState(true);
  // validate form

  // handle submit form
  const onChangeForm = (e: boolean) => {
    setIslogin(e);
    setIsSusscess({
      message: "",
      status: true,
    });
  };

  const onChangeInput = (e: any) => {
    const { value, name } = e.target;
    // [name]: value
    isLogin
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
    //- Validate auth
    //- gui form dang nhap
    try {
      const response = loginValue && (await loginApi.postData(loginValue));
      console.log(response);
      localStorage.setItem("tokken", JSON.stringify(response.data.accessToken));
      setLoginValue({ email: "", password: "" });
      navigate("/blog");
    } catch (error) {
      setIsSusscess({
        message: "Login failed!",
        status: false,
      });
      setLoginValue({ email: "", password: "" });
      setIsNotify(true);
    }
  };

  const onRegister = async () => {
    try {
      const response = regisValue && (await registerApi.postData(regisValue));
      setIsSusscess({
        message: "Registration successful, please login again!",
        status: true,
      });
      setIsNotify(true);
    } catch (error) {
      setIsSusscess({
        message: "Registration failed, please try again!",
        status: false,
      });
      setRegisValue({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        city: "",
        street: "",
      });
      setIsNotify(true);
    }
  };
  return {
    onLogin,
    onRegister,
    isLogin,
    onChangeForm,
    onChangeInput,
    loginValue,
    regisValue,
    isSusscess,
    isNotify,
  };
};
export default useAuth;
