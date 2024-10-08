import {
  IAdminUserCreate,
  IAdminUserResponse,
  IAdminUserUpdate,
  IAssignUsers,
  ICreateProject,
  IProject,
  IProjectResponse,
  IUpdateProject,
} from "../../types/type";
import axiosInstance from "../../utils/axios";
import { AxiosResponse } from "axios";

export const AdminUserAPI = {
  getAll: async (
    page: number,
    perPage: number
  ): Promise<AxiosResponse<IAdminUserResponse>> =>
    axiosInstance.get("/v1/admin/user", {
      params: { page, per_page: perPage },
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
  getProjects: async (
    page: number,
    perPage: number
  ): Promise<AxiosResponse<IProjectResponse>> =>
    axiosInstance.get(`/v1/admin/project`, {
      params: { page, per_page: perPage },
    }),

  createProject: async (
    data: ICreateProject
  ): Promise<AxiosResponse<IProject>> =>
    axiosInstance.post(`/v1/admin/project`, data),

  updateProject: async (
    id: string,
    data: IUpdateProject
  ): Promise<AxiosResponse<IProject>> =>
    axiosInstance.put(`/v1/admin/project/${id}`, data),

  deleteProject: async (id: string): Promise<AxiosResponse<void>> =>
    axiosInstance.delete(`/v1/admin/project/${id}`),

  assignUsersToProject: async (
    projectId: string,
    data: IAssignUsers
  ): Promise<AxiosResponse<IProject>> =>
    axiosInstance.post(`/v1/admin/project/${projectId}/assign`, data),
};
