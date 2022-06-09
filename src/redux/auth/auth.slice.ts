import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { userInfo } from "model/auth/auth.model";
import { getUserInfo } from "services/authApi";

export interface authState {
  accessToken: string;
  authInfo: userInfo;
}

const initialState: authState = {
  accessToken: "",
  authInfo: { name: "", avatar: "" },
};

const authSlice = createSlice({
  name: "auths",
  initialState,
  reducers: {
    getUserInforRequest: (state) => {
      state.authInfo = { name: "", avatar: "" };
    },
    getUserInforSuccess: (state, action) => {
      state.authInfo = action.payload;
    },
    getUserInforFailure: (state) => {
      state.authInfo = { name: "", avatar: "" };
    },

    setToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});
export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;

export const onGetUserInfo = async (dispatch: Dispatch) => {
  const defaultAvatar =
    "https://nestjs-series-public-bucket-wanago.s3.ap-southeast-1.amazonaws.com/d791a759-1291-4ef8-a3c8-84523ae7cecd-avataDefault.png";
  dispatch(authActions.getUserInforRequest());
  try {
    const authInfo = await getUserInfo();
    dispatch(
      authActions.getUserInforSuccess({
        name: authInfo?.data.fullName,
        avatar: authInfo.data?.avatar?.url || defaultAvatar,
      })
    );
  } catch (error) {
    alert("tài khoản không đúng");
    dispatch(authActions.getUserInforFailure());
  }
};
