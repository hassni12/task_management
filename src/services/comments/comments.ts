import { AxiosResponse } from 'axios';
import axiosInstance from '../../utils/axios';
import { IComment, ICreateComment, IUpdateComment } from '../../types/type';


export const AdminCommentAPI = {

  getComments: async (
    projectId: string,
    taskId: string
  ): Promise<AxiosResponse<IComment[]>> =>
    axiosInstance.get(`/v1/project/${projectId}/task/${taskId}/comment`),

  createComment: async (
    projectId: string,
    taskId: string,
    data: ICreateComment
  ): Promise<AxiosResponse<IComment>> =>
    axiosInstance.post(`/v1/project/${projectId}/task/${taskId}/comment`, data),

  updateComment: async (
    projectId: string,
    taskId: string,
    commentId: string,
    data: IUpdateComment
  ): Promise<AxiosResponse<IComment>> =>
    axiosInstance.put(`/v1/project/${projectId}/task/${taskId}/comment/${commentId}`, data),

  deleteComment: async (
    projectId: string,
    taskId: string,
    commentId: string
  ): Promise<AxiosResponse<void>> =>
    axiosInstance.delete(`/v1/project/${projectId}/task/${taskId}/comment/${commentId}`),
};
