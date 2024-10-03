// ** React Imports
import { lazy } from 'react';

const SettingRoutes = [

  {
    path: 'settings',
    component: lazy(() => import('../../views/setting/profile-update')),
  },
 
];

export default SettingRoutes;
