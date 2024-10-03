
import { lazy } from 'react';

const DashboardRoutes = [

  {
    path: 'dashboard',
    component: lazy(() => import('../../views/dashboard')),
  },
 
];

export default DashboardRoutes;
