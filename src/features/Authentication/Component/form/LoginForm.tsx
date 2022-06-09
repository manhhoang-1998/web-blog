import InputField from "../input-field/InputField";
import { FC } from "react";
import { LoginRequest } from "model/auth/auth.model";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

interface props {
  value: LoginRequest;
  fieldStatus: boolean;
  formStatus: boolean;
  submitMessage: string;
  onChangeForm: (e: boolean) => void;
  onChangeInput: (e: any) => void;
  onLogin: () => void;
}
const LoginForm: FC<props> = ({
  value,
  fieldStatus,
  formStatus,
  submitMessage,
  onChangeForm,
  onChangeInput,
  onLogin,
}) => {
  const loading = useSelector((state: RootState) => state.app.loading);
  return loading ? (
    <h1 style={{ fontSize: "2rem", textAlign: "center", marginTop: "200px" }}>
      Loading...
    </h1>
  ) : (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onLogin();
      }}
    >
      <img
        className="form__logo"
        src={require("assets/image/logo.png")}
        alt=""
      ></img>
      <h1 className="form__title">Login</h1>
      <p className="form__notice">
        Wellcome back, please login in to your account
      </p>
      <div className="input-list">
        <InputField
          name="email"
          value={value}
          placeholder="Email"
          fieldStatus={fieldStatus}
          onChangeInput={onChangeInput}
        />
        <InputField
          name="password"
          value={value}
          placeholder="Password"
          fieldStatus={fieldStatus}
          onChangeInput={onChangeInput}
        />
      </div>
      <a href="/" className="input-link">
        Forget Password?
      </a>
      <p
        className="message"
        style={formStatus ? { color: "green" } : { color: "red" }}
      >
        {submitMessage}
      </p>
      <button type="submit" className="form__btn">
        Login
      </button>
      <button className="form__btn" onClick={() => onChangeForm(false)}>
        Create new account
      </button>
    </form>
  );
};

export default LoginForm;
