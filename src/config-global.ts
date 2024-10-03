// import { paths } from 'src/routes/paths';

import { paths } from "./routes/paths";

export const TASK_HOST_API = import.meta.env.VITE_TASK_MANGER_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.root; // as '/dashboard'
