export enum UserRole {
  Admin = "admin",
  User = "user",
}
export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  DONE = "done",
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
  name: string;
  email: string;
  password: string;
  role?: UserRole;
};
export type IUser = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  role: string;
  profile: string | null;
  is_active: number;
  created_at: string;
  updated_at: string;
};

export type IAuthLoginRegisterResponse = {
  status: number;
  message: string;
  token: string;
  user: IUser;
  errors: any[];
};

export interface IAdminUserResponse {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  role?: UserRole;
  profile: string | null;
  is_active: UserStatus;
  created_at: string;
  updated_at: string;
}

export interface IAdminUserCreate {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  is_active: UserStatus;
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
  id: number;
  name: string;
  description: string;
  icon: string | null;
  is_active: UserStatus;
  created_at: string;
  updated_at: string;
  users: IProjectUser[];
}

export interface ICreateProject {
  name: string;
  description: string;
  is_active?: UserStatus;
}

export interface IUpdateProject {
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
  is_active: boolean;
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
