import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSlice } from "@types";

const initialState: UserSlice = {
  loggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    ActionLogin: (
      state,
      action: PayloadAction<{
        name: string;
        email: string;
      }>
    ) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.loggedIn = true;

      // save user slice to localstorage
      localStorage.setItem("user", JSON.stringify(state));
    },
    ActionLogout: (state) => {
      state.name = undefined;
      state.email = undefined;
      state.loggedIn = false;

      localStorage.removeItem("user");
    },
  },
});

export const { ActionLogin, ActionLogout } = userSlice.actions;
export default userSlice;
