import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAdminUser } from "../../types/type";
interface AuthState {
  user: IAdminUser | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<IAdminUser>) {
      const { payload } = action;
      state.user = payload;
    },
    updateUser(state, action: PayloadAction<IAdminUser>) {
      const { payload } = action;
      state.user = payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUserData, clearUser, updateUser } = authSlice.actions;
export default authSlice.reducer;
