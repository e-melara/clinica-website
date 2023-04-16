const routes = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "LoginPage" */ './views/Login.vue'),
  },
];

export default routes;
