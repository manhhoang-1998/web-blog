import React, { FC } from "react";
import Input from "../../../components/Input/Input";
import { RegisRequest } from "../../../model/login";

interface RegisProps {
  onHandleClick: (e: boolean) => void;
  onChangeForm: (e: boolean) => void;
  onChangeInput: (e: any) => void;
  regisValue: RegisRequest;
  message: string;
  status: boolean;
  notify: boolean;
}
const SignUpForm: FC<RegisProps> = ({
  onHandleClick,
  onChangeForm,
  onChangeInput,
  regisValue,
  message,
  status,
  notify,
}) => {
  const showForm = () => {
    onChangeForm(true);
  };
  const handleRegister = () => {
    onHandleClick(true);
  };
  return (
    <div>
      <button className="form__back" onClick={showForm}>
        <i className="form__back-icon fa-solid fa-arrow-left"></i>
      </button>
      <img
        className="form__logo"
        src={require("../../../image/logo.png")}
        alt=""
      ></img>
      <h1 className="form__title">Create new account</h1>
      <p className="form__notice">
        Wellcome back, please login in to your account
      </p>
      <div className="input-list">
        <Input
          notify={notify}
          name="email"
          onChange={onChangeInput}
          value={regisValue.email}
          placeholder="Email"
        />
        <Input
          notify={notify}
          name="password"
          onChange={onChangeInput}
          value={regisValue.password}
          placeholder="Password"
        />
        <Input
          notify={notify}
          name="firstName"
          onChange={onChangeInput}
          value={regisValue.firstName}
          placeholder="First Name"
        />
        <Input
          notify={notify}
          name="lastName"
          onChange={onChangeInput}
          value={regisValue.lastName}
          placeholder="Last Name"
        />
        <Input
          notify={notify}
          name="city"
          onChange={onChangeInput}
          value={regisValue.city}
          placeholder="City"
        />
        <Input
          notify={notify}
          name="street"
          onChange={onChangeInput}
          value={regisValue.street}
          placeholder="Street"
        />
      </div>
      <p
        className="message"
        style={status ? { color: "green" } : { color: "red" }}
      >
        {message}
      </p>
      <button className="form__btn" onClick={handleRegister}>
        Create new account
      </button>
    </div>
  );
};

export default SignUpForm;
