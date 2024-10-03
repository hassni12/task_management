// slices/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IAdminUser, IAdminUserResponse } from "../../types/type";
import { AdminUserAPI } from "../../services/admin/admin-api";
import { AxiosResponse } from "axios";
interface UserState {
  loading: boolean;
  users: IAdminUser[];
  allUsers: IAdminUser[];
  error: string | null;
  page: number;
  total: number;
  perPage: number;
}

const initialState: UserState = {
  loading: false,
  users: [],
  allUsers: [],
  error: null,
  page: 1,
  perPage: 10,
  total: 0,
};

export const fetchUsers = createAsyncThunk<
  IAdminUserResponse,
  { page: number; perPage: number }
>("user/fetchUsers", async ({ page, perPage }) => {
  const response: AxiosResponse<IAdminUserResponse> = await AdminUserAPI.getAll(
    page,
    perPage
  );
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearAllUsers: (state) => {
      state.allUsers = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<IAdminUserResponse>) => {
        state.loading = false;
        state.allUsers = [...state.allUsers, ...action.payload.data];; 
        state.users = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.current_page;
        state.perPage = action.payload.per_page;

        state.error = null;
      }
    );
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message || "Failed to fetch users";
    });
  },
});
export const { clearAllUsers } = userSlice.actions;
export default userSlice.reducer;
