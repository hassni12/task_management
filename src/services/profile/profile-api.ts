import { IProfileResponse, IProfileUpdate } from "../../types/services-type";
import axiosInstance from "../../utils/axios";
import { AxiosResponse } from "axios";
export const ProfileAPI = {
  getProfile: async (): Promise<AxiosResponse<IProfileResponse>> =>
    axiosInstance.get("/v1/profile"),

  updateProfile: async (
    data: IProfileUpdate
  ): Promise<AxiosResponse<IProfileResponse>> =>
    axiosInstance.post("/v1/profile", data),
};
