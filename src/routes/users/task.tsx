// ** React Imports
import { lazy } from 'react';

const TaskUserRoutes = [

  {
    path: 'user/:id/task',
    component: lazy(() => import('../../views/user-view/task/task-section')),
  },
 
];

export default TaskUserRoutes;
