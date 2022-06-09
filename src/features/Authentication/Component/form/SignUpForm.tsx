import React, { FC } from "react";
import InputField from "../input-field/InputField";
import { RegisRequest } from "model/auth/auth.model";
import { loadavg } from "os";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

interface props {
  value: RegisRequest;
  fieldStatus: boolean;
  formStatus: boolean;
  submitMessage: string;
  onChangeForm: (e: boolean) => void;
  onChangeInput: (e: any) => void;
  onRegister: () => void;
}
const SignUpForm: FC<props> = ({
  value,
  fieldStatus,
  formStatus,
  submitMessage,
  onChangeForm,
  onChangeInput,
  onRegister,
}) => {
  const loading = useSelector((state: RootState) => state.app.loading);
  return loading ? (
    <h1 style={{ textAlign: "center", lineHeight: "150px", fontSize: "2rem" }}>
      Loading....
    </h1>
  ) : (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onRegister();
      }}
    >
      <button className="form__back" onClick={() => onChangeForm(true)}>
        <i className="form__back-icon fa-solid fa-arrow-left"></i>
      </button>
      <img
        className="form__logo"
        src={require("assets/image/logo.png")}
        alt=""
      ></img>
      <h1 className="form__title">Create new account</h1>
      <p className="form__notice">
        Wellcome back, please login in to your account
      </p>
      <div className="input-list">
        <InputField
          name="email"
          placeholder="Email"
          value={value}
          fieldStatus={fieldStatus}
          onChangeInput={onChangeInput}
        />
        <InputField
          name="password"
          placeholder="Password"
          value={value}
          fieldStatus={fieldStatus}
          onChangeInput={onChangeInput}
        />
        <InputField
          name="firstName"
          placeholder="First Name"
          value={value}
          fieldStatus={fieldStatus}
          onChangeInput={onChangeInput}
        />
        <InputField
          name="lastName"
          placeholder="LastName"
          value={value}
          fieldStatus={fieldStatus}
          onChangeInput={onChangeInput}
        />
        <InputField
          name="city"
          placeholder="City"
          value={value}
          fieldStatus={fieldStatus}
          onChangeInput={onChangeInput}
        />
        <InputField
          name="street"
          placeholder="Street"
          value={value}
          fieldStatus={fieldStatus}
          onChangeInput={onChangeInput}
        />
      </div>
      <p
        className="message"
        style={formStatus ? { color: "green" } : { color: "red" }}
      >
        {submitMessage}
      </p>
      <button className="form__btn">Create new account</button>
    </form>
  );
};

export default SignUpForm;
