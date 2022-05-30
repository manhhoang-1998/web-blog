import { LoginRequest, RegisRequest } from "../model/login";
import Api from "./api";

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
