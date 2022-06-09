import { createSlice } from "@reduxjs/toolkit";

export interface authState {
  loading: boolean;
}

const initialState: authState = {
  loading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});
export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions;
