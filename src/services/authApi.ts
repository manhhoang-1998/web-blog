import { LoginRequest, RegisRequest } from "model/auth/auth.model";
import Api from "services/api";

export const loginApi = {
  postData(data: LoginRequest) {
    return Api.post("/authentication/log-in", data);
  },
};

export const registerApi = {
  postData(data: RegisRequest) {
    return Api.post("/authentication/register", data);
  },
};

export const logoutApi = {
  postData() {
    return Api.post("/authentication/log-out");
  },
};

export const getUserInfo = () => {
  return Api.get("/authentication");
};
