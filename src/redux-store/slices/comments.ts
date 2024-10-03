import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AdminCommentAPI } from "../../services/comments/comments";
import { IComment } from "../../types/type";

interface CommentsState {
  comments: IComment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  loading: false,
  error: null,
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async ({ projectId, taskId }: { projectId: string; taskId: string }) => {
    const response = await AdminCommentAPI.getComments(projectId, taskId);
    return response.data;
  }
);
export const addComment = createAsyncThunk(
    'comments/addComment',
    async ({ projectId, taskId, content }: { projectId: string; taskId: string;  content: string }) => {
      const response = await AdminCommentAPI.createComment(projectId, taskId, { content });
      return response.data; 
    }
  );
const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    resetComments: (state) => {
      state.comments = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch comments";
      });
  },
});

export const { resetComments } = commentsSlice.actions;
export default commentsSlice.reducer;
