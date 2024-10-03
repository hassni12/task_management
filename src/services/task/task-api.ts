import { AxiosResponse } from "axios";
import {
  IAssignTask,
  ICreateTask,
  ITask,
  ITaskResponse,
  IUpdateTask,
} from "../../types/type";
import axiosInstance from "../../utils/axios";

export const AdminTaskAPI = {
  getTasks: async (projectId: string): Promise<AxiosResponse<ITaskResponse>> =>
    axiosInstance.get(`/v1/project/${projectId}/task`),

  getTask: async (
    projectId: string,
    taskId: string
  ): Promise<AxiosResponse<ITask>> =>
    axiosInstance.get(`/v1/project/${projectId}/task/${taskId}`),

  createTask: async ({
    projectId,
    data,
  }:{
    projectId: string | undefined,
    data: ICreateTask,
  }): Promise<AxiosResponse<ITask>> =>
    axiosInstance.post(`/v1/project/${projectId}/task`, data),

  updateTask: async (
    projectId: string,
    taskId: string,
    data: IUpdateTask
  ): Promise<AxiosResponse<ITask>> =>
    axiosInstance.put(`/v1/project/${projectId}/task/${taskId}`, data),

  deleteTask: async (
    projectId: string,
    taskId: string
  ): Promise<AxiosResponse<void>> =>
    axiosInstance.delete(`/v1/project/${projectId}/task/${taskId}`),

  assignTask: async (
    projectId: string,
    taskId: string,
    data: IAssignTask
  ): Promise<AxiosResponse<ITask>> =>
    axiosInstance.post(`/v1/project/${projectId}/task/${taskId}/assign`, data),
};
