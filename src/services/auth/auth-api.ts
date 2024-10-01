import { IAuthLogin, IAuthLoginRegisterResponse, IAuthRegisterUser } from "../../types/services-type";
import axiosInstance from "../../utils/axios";
import { AxiosResponse } from "axios";

export const AuthAPI = {
  login: async (data: IAuthLogin): Promise<AxiosResponse<IAuthLoginRegisterResponse>> =>
    axiosInstance.post(`/v1/login`, data),
  register: async (data: IAuthRegisterUser): Promise<AxiosResponse<IAuthLoginRegisterResponse>> =>
    axiosInstance.post(`/v1/register`, data),
  logout: async (): Promise<AxiosResponse> => axiosInstance.post(`/v1/logout`,),
};
