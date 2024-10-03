import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask, ITaskResponse, TaskStatus } from "../../types/type";
import { AxiosResponse } from "axios";
import { AdminTaskAPI } from "../../services/task/task-api";
interface TaskState {
  loading: boolean;
  error: string | null;
  page: number;
  total: number;
  perPage: number;
  tasks: Record<TaskStatus, ITask[]>;
  allTasks: ITask[];
}
const initialState: TaskState = {
  loading: false,
  error: null,
  page: 1,
  total: 0,
  perPage: 10,
  allTasks: [],
  tasks: {
    [TaskStatus.TODO]: [],
    [TaskStatus.IN_PROCESS]: [],
    [TaskStatus.TESTING]: [],
    [TaskStatus.HOLD]: [],
    [TaskStatus.COMPLETED]: [],
  },
};
export const fetchTasks = createAsyncThunk<
  ITaskResponse,
  { projectId: string }
>("task/fetchTasks", async ({ projectId }) => {
  const response: AxiosResponse<ITaskResponse> = await AdminTaskAPI.getTasks(
    projectId
  );
  return response.data;
});

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchTasks.fulfilled,
      (state, action: PayloadAction<ITaskResponse>) => {
        state.loading = false;
        state.error = null;

        state.tasks = {
          [TaskStatus.TODO]: [],
          [TaskStatus.IN_PROCESS]: [],
          [TaskStatus.TESTING]: [],
          [TaskStatus.HOLD]: [],
          [TaskStatus.COMPLETED]: [],
        };
        if (action.payload && Array.isArray(action.payload)) {
          action.payload.forEach((task: ITask) => {
            const status = task.status as TaskStatus;
            if (state.tasks[status]) {
              state.tasks[status].push(task);
            }
          });
        }
        state.allTasks = action.payload;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.perPage = action.payload.per_page;
      }
    );
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch tasks";
    });
  },
});

export default taskSlice.reducer;
