import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/Input/Input";
import { LoginRequest } from "../../../model/login";
interface LoginProps {
  onHandleClick: () => void;
  onChangeForm: (e: boolean) => void;
  onChangeInput: (e: any) => void;
  loginValue: LoginRequest;
  status: boolean;
  message: string;
  notify: boolean;
}
const LoginForm: FC<LoginProps> = ({
  onHandleClick,
  onChangeForm,
  onChangeInput,
  loginValue,
  status,
  message,
  notify,
}) => {
  const showRegisForm = () => {
    onChangeForm(false);
  };
  return (
    <div>
      <img
        className="form__logo"
        src={require("../../../image/logo.png")}
        alt=""
      ></img>
      <h1 className="form__title">Login</h1>
      <p className="form__notice">
        Wellcome back, please login in to your account
      </p>
      <div className="input-list">
        <Input
          notify={notify}
          name="email"
          onChange={onChangeInput}
          value={loginValue.email}
          placeholder="Email"
        />
        <Input
          notify={notify}
          name="password"
          onChange={onChangeInput}
          value={loginValue.password}
          placeholder="Password"
        />
      </div>
      <a href="/" className="input-link">
        Forget Password?
      </a>
      <p
        className="message"
        style={status ? { color: "green" } : { color: "red" }}
      >
        {message}
      </p>
      <button onClick={onHandleClick} className="form__btn">
        Login
      </button>
      <button className="form__btn" onClick={showRegisForm}>
        Create new account
      </button>
    </div>
  );
};

export default LoginForm;
