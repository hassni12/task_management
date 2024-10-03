import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IProfileResponse } from "../../types/type";
import { AxiosResponse } from "axios";
import { ProfileAPI } from "../../services/profile/profile-api";

interface ProfileState {
  loading: boolean;
  profile: IProfileResponse | null;
  error: string | null;
}

const initialState: ProfileState = {
  loading: false,
  profile: null,
  error: null,
};

export const fetchProfile = createAsyncThunk<IProfileResponse>(
  "profile/fetchProfile",
  async () => {
    const response: AxiosResponse<IProfileResponse> = await ProfileAPI.getProfile();
    return response.data;
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.loading = false;
      state.profile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action: PayloadAction<IProfileResponse>) => {
      state.loading = false;
      state.profile = action.payload;
      state.error = null;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.loading = false;
      state.profile = null;
      state.error = action.error.message || "Failed to fetch profile";
    });
  },
});
export const { clearProfile } = profileSlice.actions;

export default profileSlice.reducer;
