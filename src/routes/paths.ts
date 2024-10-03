const ROOTS = {
  AUTH: "/login",
  DASHBOARD: '/dashboard',

};

export const paths = {
  auth: {
    jwt: {
      login: ROOTS.AUTH,
    },
    
  },
  dashboard: {
    root: ROOTS.DASHBOARD,
  },
};
