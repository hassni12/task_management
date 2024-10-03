import { AxiosResponse } from "axios";
import axiosInstance from "../../utils/axios";
import {
  IAssignPayload,
  IProjectResponse,
  ISingleProjectUserResponse,
  ITaskPayload,
  ITaskResponse,
} from "../../types/type";

export const UserProjectAPI = {
  getAllProjects: async (
    page: number,
    perPage: number
  ): Promise<AxiosResponse<IProjectResponse>> =>
    axiosInstance.get("/v1/project", {
      params: { page, per_page: perPage },
    }),

  getProjectById: async (
    projectId: number
  ): Promise<AxiosResponse<ISingleProjectUserResponse>> =>
    axiosInstance.get(`/v1/project/${projectId}`),
};

export const UserProjectTaskAPI = {
  getAllTasks: async (
    projectId: number
  ): Promise<AxiosResponse<ITaskResponse[]>> =>
    axiosInstance.get(`/v1/project/${projectId}/task`),

  getTaskById: async (
    projectId: number,
    taskId: number
  ): Promise<AxiosResponse<ITaskResponse>> =>
    axiosInstance.get(`/v1/project/${projectId}/task/${taskId}`),

  createTask: async (
    projectId: number,
    data: ITaskPayload
  ): Promise<AxiosResponse<ITaskResponse>> =>
    axiosInstance.post(`/v1/project/${projectId}/task`, data),

  updateTask: async (
    projectId: number,
    taskId: number,
    data: ITaskPayload
  ): Promise<AxiosResponse<ITaskResponse>> =>
    axiosInstance.put(`/v1/project/${projectId}/task/${taskId}`, data),

  assignUsers: async (
    projectId: number,
    taskId: number,
    data: IAssignPayload
  ): Promise<AxiosResponse<void>> =>
    axiosInstance.post(`/v1/project/${projectId}/task/${taskId}/assign`, data),
};
