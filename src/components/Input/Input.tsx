import { FC, useContext } from "react";
import "./Input.scss";
import { useState } from "react";
export type InputProps = {
  notify: boolean;
  name: string;
  onChange: (e: any) => void;
  value: string;
  placeholder: string;
  showPassword?: () => boolean;
};
const Input: FC<InputProps> = ({
  notify,
  name,
  onChange,
  value,
  placeholder,
}) => {
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const handlePassword = () => {
    setIsPassword(!isPassword);
  };
  return (
    <div className=" input-wrap">
      <input
        name={name}
        type={name === "password" && isPassword ? "password" : "text"}
        className="input"
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        value={value}
      />
      {name === "password" ? (
        <button className="input-icon-btn" onClick={handlePassword}>
          <i className="input-icon fa-solid fa-eye-slash"></i>
        </button>
      ) : (
        <></>
      )}
      {notify ? (
        <p className="input-notify"> * Please enter your {name}</p>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Input;
