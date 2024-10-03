// ** React Imports
import { lazy } from "react";

const UserRoutes = [
  {
    path: "user",
    component: lazy(() => import("../../views/user/user-list")),
  },
];

export default UserRoutes;
