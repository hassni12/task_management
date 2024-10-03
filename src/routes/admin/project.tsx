// ** React Imports
import { lazy } from 'react';

const ProjectRoutes = [

  {
    path: 'project',
    component: lazy(() => import('../../views/project/project-list')),
  },
 
];

export default ProjectRoutes;
