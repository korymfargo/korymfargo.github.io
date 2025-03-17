import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";
import dogsSlice from "./dogs";

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    dogs: dogsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { ActionLogin, ActionLogout } from "./user";
export { ActionAddDogs, ActionSetFavourite } from "./dogs";
