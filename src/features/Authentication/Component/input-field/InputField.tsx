import { FC } from "react";
import "./InputField.scss";
import { useState } from "react";
export type InputProps = {
  name: string;
  placeholder: string;
  value: any;
  fieldStatus: boolean;
  onChangeInput: (e: any) => void;
};
const InputField: FC<InputProps> = ({
  name,
  placeholder,
  value,
  fieldStatus,
  onChangeInput,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className=" input-wrap">
      <input
        name={name}
        type={name === "password" && showPassword ? "password" : "text"}
        className="input"
        placeholder={placeholder}
        onChange={(e) => onChangeInput(e)}
        value={value[name]}
      />
      {name === "password" ? (
        <button
          type="button"
          className="input-icon-btn"
          onClick={handlePassword}
        >
          <i className="input-icon fa-solid fa-eye-slash"></i>
        </button>
      ) : (
        <></>
      )}
      {fieldStatus ? (
        <p className="input-notify"> * Please enter your {name}</p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default InputField;
