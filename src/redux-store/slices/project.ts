import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProject, IProjectResponse } from "../../types/type";
import { AdminProjectAPI } from "../../services/admin/admin-api";
import { AxiosResponse } from "axios";

interface ProjectState {
  loading: boolean;
  projects: IProject[];
  error: string | null;
  page: number;
  total: number;
  perPage: number;
}

const initialState: ProjectState = {
  loading: false,
  projects: [],
  error: null,
  page: 1,
  perPage: 10,
  total: 0,
};

export const fetchProjects = createAsyncThunk<
  IProjectResponse,
  { page: number; perPage: number }
>("project/fetchProjects", async ({ page, perPage }) => {
  const response: AxiosResponse<IProjectResponse> =
    await AdminProjectAPI.getProjects(page, perPage);
  return response.data;
});

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchProjects.fulfilled,
      (state, action: PayloadAction<IProjectResponse>) => {
        state.loading = false;
        state.projects = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.current_page;
        state.perPage = action.payload.per_page;
        state.error = null;
      }
    );
    builder.addCase(fetchProjects.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch projects";
    });
  },
});

export default projectSlice.reducer;
