// ** React Imports
import { lazy } from 'react';

const SettingUserRoutes = [

  {
    path: 'user/settings',
    component: lazy(() => import('../../views/setting/profile-update')),
  },
 
];

export default SettingUserRoutes;
