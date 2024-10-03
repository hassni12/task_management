import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProject, IProjectResponse } from "../../types/type";
import { UserProjectAPI } from "../../services/user/user-api";
import { AxiosResponse } from "axios";

interface UserProjectState {
  loading: boolean;
  projects: IProject[];
  error: string | null;
  page: number;
  total: number;
  perPage: number;
}

const initialState: UserProjectState = {
  loading: false,
  projects: [],
  error: null,
  page: 1,
  perPage: 10,
  total: 0,
};

export const fetchUserProjects = createAsyncThunk<
  IProjectResponse,
  { page: number; perPage: number }
>("userProject/fetchUserProjects", async ({ page, perPage }) => {
  const response: AxiosResponse<IProjectResponse> =
    await UserProjectAPI.getAllProjects(page, perPage);
  return response.data;
});

const userProjectSlice = createSlice({
  name: "userProject",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserProjects.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUserProjects.fulfilled,
      (state, action: PayloadAction<IProjectResponse>) => {
        state.loading = false;
        state.projects = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.current_page;
        state.perPage = action.payload.per_page;
        state.error = null;
      }
    );
    builder.addCase(fetchUserProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch user projects";
    });
  },
});

export default userProjectSlice.reducer;
