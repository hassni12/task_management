import {
  IAdminUserCreate,
  IAdminUserResponse,
  IAdminUserUpdate,
  IAssignUsers,
  ICreateProject,
  IProject,
  IUpdateProject,
} from "../../types/services-type";
import axiosInstance from "../../utils/axios";
import { AxiosResponse } from "axios";
export const AdminUserAPI = {
  getAll: async (page: string): Promise<AxiosResponse<IAdminUserResponse[]>> =>
    axiosInstance.get("/v1/admin/user", {
      params: { page },
    }),

  create: async (
    data: IAdminUserCreate
  ): Promise<AxiosResponse<IAdminUserResponse>> =>
    axiosInstance.post("/v1/admin/user", data),

  update: async (
    id: string,
    data: IAdminUserUpdate
  ): Promise<AxiosResponse<IAdminUserResponse>> =>
    axiosInstance.put(`/v1/admin/user/${id}`, data),

  delete: async (id: string): Promise<AxiosResponse<void>> =>
    axiosInstance.delete(`/v1/admin/user/${id}`),
};

export const AdminProjectAPI = {
  getProjects: async (page: string): Promise<AxiosResponse<IProject[]>> =>
    axiosInstance.get(`/v1/admin/project`, {
      params: { page },
    }),

  createProject: async (
    data: ICreateProject
  ): Promise<AxiosResponse<IProject>> =>
    axiosInstance.post(`/v1/admin/project`, data),

  updateProject: async (
    id: number,
    data: IUpdateProject
  ): Promise<AxiosResponse<IProject>> =>
    axiosInstance.put(`/v1/admin/project/${id}`, data),

  deleteProject: async (id: number): Promise<AxiosResponse<void>> =>
    axiosInstance.delete(`/v1/admin/project/${id}`),

  assignUsersToProject: async (
    projectId: number,
    data: IAssignUsers
  ): Promise<AxiosResponse<IProject>> =>
    axiosInstance.post(`/v1/admin/project/${projectId}/assign`, data),
};


