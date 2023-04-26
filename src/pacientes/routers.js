const routes = [
  {
    path: '/patients',
    component: () => import(/* webpackChunkName: "LoginPage" */ '../components/Layout.vue'),
    children: [
      {
        path: 'list',
        name: 'patients-list',
        component: () => import(/* webpackChunkName: "LoginPage" */ './views/ListPacientes.vue'),
        meta: {
          rol: 'ROL_PATIENTS_VIEW_LIST',
        },
      },
      {
        path: ':id/historial',
        name: 'patients-historial-clinico',
        component: () =>
          import(/* webpackChunkName: "LoginPage" */ './views/AddHistorialClinico.vue'),
        meta: {
          rol: 'ROL_PATIENTS_VIEW_LIST',
        },
      },
    ],
  },
];

export default routes;
