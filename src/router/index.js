import Vue from 'vue';
import VueRouter from 'vue-router';
import jsonDecode from 'jwt-decode';

import autheticationRoute from '../authetication/router';
import pacientesRoute from '../pacientes/routers';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "layout" */ '../components/Layout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/HomePage.vue'),
      },
    ],
  },
  ...autheticationRoute,
  ...pacientesRoute,
  { path: '*', redirect: 'login' },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, _, next) => {
  const path = to.path;
  const meta = to.meta;
  const publicPages = ['/login'];
  const loggedIn = localStorage.getItem('token');
  const authRequired = !publicPages.includes(path);

  if (authRequired) {
    if (loggedIn === undefined) {
      next('/login');
    }
    try {
      const decoded = jsonDecode(loggedIn);
      if (['/', '/dashboard'].includes(path)) {
        return next();
      }
      if (decoded['roles']) {
        const rol = meta.rol;
        if (decoded['roles'].includes(rol)) {
          return next();
        }
      }
      throw new Error();
    } catch (error) {
      next('/authenticate/login');
    }
  } else {
    return next();
  }
});

export default router;
