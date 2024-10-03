// ** React Imports
import { lazy } from 'react';

const ProjectUserRoutes = [

  {
    path: 'user/project',
    component: lazy(() => import('../../views/user-view/project/project-list')),
  },
 
];

export default ProjectUserRoutes;
