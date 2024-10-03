import DashboardRoutes from "./admin/dashboard";
import ProjectRoutes from "./admin/project";
import SettingRoutes from "./admin/setting";
import UserRoutes from "./admin/user";
import ProjectUserRoutes from "./users/project";
import SettingUserRoutes from "./users/setting";
import TaskUserRoutes from "./users/task";

const AllRoutes = [
  // Admin
  ...ProjectRoutes,
  ...UserRoutes,
  ...SettingRoutes,
  ...DashboardRoutes,
  // user
  ...ProjectUserRoutes,
  ...SettingUserRoutes,
  ...TaskUserRoutes
];
export { AllRoutes };
