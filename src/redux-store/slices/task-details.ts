import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ITask } from "../../types/type";
import { AdminTaskAPI } from "../../services/task/task-api";

interface TaskDetailsState {
  task: ITask | null;
  subtasks: ITask[];
  comments: string[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskDetailsState = {
  task: null,
  subtasks: [],
  comments: [],
  loading: false,
  error: null,
};

export const fetchTaskDetails = createAsyncThunk(
  "taskDetails/fetchTaskDetails",
  async (
    { projectId, taskId }: { projectId: string; taskId: string }
  ) => {
    const response = await AdminTaskAPI.getTask(projectId, taskId);
    return response.data;
  }
);

const taskDetailsSlice = createSlice({
  name: "taskDetails",
  initialState,
  reducers: {
    resetTaskDetails(state) {
      state.task = null;
      state.subtasks = [];
      state.comments = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTaskDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTaskDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.task = action.payload;
        state.subtasks = action.payload.subtasks || [];
        state.comments = action.payload.comments || [];
        state.error = null;
      })
      .addCase(fetchTaskDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetTaskDetails } = taskDetailsSlice.actions;

export default taskDetailsSlice.reducer;
