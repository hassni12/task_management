export enum UserRole {
  Admin = "admin",
  User = "user",
}
export enum TaskStatus {
  TODO = "todo",
  IN_PROCESS = "in-progress",
  TESTING = "testing",
  HOLD = "hold",
  COMPLETED = "completed",
}
export interface Task {
  id: string;
  parent_id: number | null;
  project_id: number;
  name: string;
  description: string;
  due_date: string;
  assignee_id: number;
  status: TaskStatus;
  created_at: string;
  updated_at: string;
}

export enum UserStatus {
  Active = 1,
  Inactive = 0,
}
export type IAuthLogin = {
  email: string;
  password: string;
};
export type IAuthRegisterUser = {
  id?: string;
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  is_active?: UserStatus;
};

export type IUser = {
  id: string;
  name: string;
  email: string;
  email_verified_at: string | null;
  role: UserRole;
  profile: string | null;
  is_active: UserStatus;
  created_at: string;
  updated_at: string;
  password: string;
};

export type IAuthLoginRegisterResponse = {
  status: number;
  message: string;
  token: string;
  user: IUser;
  errors: any[];
};

export interface IAdminUser {
  id: string;
  name: string;
  email: string;
  email_verified_at?: string | null;
  role?: UserRole;
  profile?: string | null;
  is_active?: UserStatus;
  created_at?: string;
  updated_at?: string;
  password: string;
}
export interface IAdminUserResponse {
  data: IAdminUser[];
  total: number;
  current_page: number;
  per_page: number;
}
export interface IAdminUserCreate {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  is_active?: UserStatus;
}

export interface IAdminUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  is_active?: UserStatus;
}

export interface IProjectUser {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  role: UserRole;
  profile: string | null;
  is_active: UserStatus;
  created_at: string;
  updated_at: string;
  pivot: {
    project_id: number;
    user_id: number;
  };
}

export interface IProject {
  id: string;
  name: string;
  description: string;
  icon: string | null;
  is_active: UserStatus;
  created_at: string;
  updated_at: string;
  users: IProjectUser[];
  total: number;
  current_page: number;
  per_page: number;
}
export interface IProjectResponse {
  data: IProject[];
  total: number;
  current_page: number;
  per_page: number;
}

export interface ICreateProject {
  name: string;
  description: string;
  is_active?: UserStatus;
}

export interface IUpdateProject {
  id?: string;
  name?: string;
  description?: string;
  is_active?: UserStatus;
}
export interface IAssignUsers {
  user_ids: number[];
}

export interface IProfileResponse {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  is_active: UserStatus;
  created_at: string;
  updated_at: string;
}

export interface IProfileUpdate {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  is_active: UserStatus;
}

export interface IProjectUserResponse {
  id: number;
  name: string;
  description: string;
  icon: string | null;
  is_active: UserStatus;
  created_at: string;
  updated_at: string;
  users: IProjectUser[];
}

export interface ISingleProjectUserResponse {
  id: number;
  name: string;
  description: string;
  icon: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  users: IProjectUser[];
}

export interface IProjectUserPayload {
  name: string;
  description: string;
  icon?: string;
  is_active: boolean;
}

export interface ITaskResponse {
  id: number;
  parent_id: number | null;
  project_id: number;
  name: string;
  description: string;
  due_date: string;
  assignee_id: number | null;
  status: TaskStatus;
  created_at: string;
  updated_at: string;
}

export interface ITaskPayload {
  parent_id?: number;
  name: string;
  description: string;
  due_date: string;
  status: TaskStatus;
}

export interface IAssignPayload {
  assignee_id: string;
}
export interface Column {
  title: string;
  is_show: boolean;
  dataIndex?: string;
  key: string;
  sorter?: boolean;
  render?: (value: any, row: IProjectUserResponse) => React.ReactNode;
}

export interface ITask {
  id: string;
  parent_id: number | null;
  project_id: string;
  name: string;
  description: string;
  due_date: string;
  assignee_id: number | null;
  status: TaskStatus;
  created_at: string;
  updated_at: string;
  subtasks?: ITask[];
  comments?: string[];
}

export interface ITaskResponse {
  data: ITask[];
  total: number;
  page: number;
  per_page: number;
}

export interface ICreateTask {
  parent_id?: number;
  name: string;
  description: string;
  due_date: string;
  status: TaskStatus;
}

export interface IUpdateTask {
  name?: string;
  description?: string;
  due_date?: string;
  status?: TaskStatus;
}

export interface IAssignTask {
  assignee_id: number;
}
export interface IComment {
  id: number;
  parent_id: number | null;
  user_id: number;
  task_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  replies: IComment[];
}

export interface ICreateComment {
  parent_id?: string; 
  content: string;
}

export interface IUpdateComment {
  content: string;
}
