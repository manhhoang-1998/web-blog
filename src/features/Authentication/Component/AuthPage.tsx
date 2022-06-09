import { FC } from "react";
import useAuth from "../Hooks/useAuth";
import "./AuthPage.scss";
import CardItem, { CardItemProps } from "./card-item/CardItem";
import LoginForm from "./form/LoginForm";
import SignUpForm from "./form/SignUpForm";

const ListItem: CardItemProps[] = [
  {
    image:
      "https://i1-thethao.vnecdn.net/2022/05/21/6fef22a271e9b1b7e8f8-jpeg-1653133838.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=g-0mKZgvxnxm52pelSPZcA",
    title: "Mr Beer",
  },
  {
    image:
      "https://i1-thethao.vnecdn.net/2022/05/21/6fef22a271e9b1b7e8f8-jpeg-1653133838.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=g-0mKZgvxnxm52pelSPZcA",
    title: "David James",
  },
  {
    image:
      "https://i1-thethao.vnecdn.net/2022/05/21/6fef22a271e9b1b7e8f8-jpeg-1653133838.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=g-0mKZgvxnxm52pelSPZcA",
    title: "Fox",
  },
  {
    image:
      "https://i1-thethao.vnecdn.net/2022/05/21/6fef22a271e9b1b7e8f8-jpeg-1653133838.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=g-0mKZgvxnxm52pelSPZcA",
    title: "Hawkins360",
  },
  {
    image:
      "https://i1-thethao.vnecdn.net/2022/05/21/6fef22a271e9b1b7e8f8-jpeg-1653133838.jpg?w=680&h=408&q=100&dpr=1&fit=crop&s=g-0mKZgvxnxm52pelSPZcA",
    title: "NeeeLesh Cha",
  },
  { title: "Add new account" },
];

const AuthPage: FC = () => {
  const {
    onLogin,
    onRegister,
    onChangeForm,
    onChangeInput,
    isLoginForm,
    loginValue,
    regisValue,
    isSusscess,
    isNotify,
  } = useAuth();
  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-title">
          <span className="login-title__main">Đăng nhập gần đây</span>
          <span className="login-title__desc">
            Nhấp vào ảnh của bạn hoặc thêm tài khoản
          </span>
        </div>
        <div className="card-list">
          {ListItem.map((item: CardItemProps, index: number) => (
            <CardItem key={index} image={item.image} title={item.title} />
          ))}
        </div>
      </div>
      <div className="login-right">
        {isLoginForm ? (
          <LoginForm
            value={loginValue}
            fieldStatus={isNotify}
            formStatus={isSusscess.status}
            submitMessage={isSusscess.message}
            onChangeForm={onChangeForm}
            onChangeInput={onChangeInput}
            onLogin={onLogin}
            // loading={loading}
          />
        ) : (
          <SignUpForm
            value={regisValue}
            fieldStatus={isNotify}
            formStatus={isSusscess.status}
            submitMessage={isSusscess.message}
            onChangeForm={onChangeForm}
            onChangeInput={onChangeInput}
            onRegister={onRegister}
          />
        )}
      </div>
    </div>
  );
};
export default AuthPage;
