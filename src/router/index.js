import Vue from 'vue';
import VueRouter from 'vue-router';

import AutheticationRoute from '../authetication/router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "layout" */ '../components/Layout.vue'),
    children: [],
  },
  ...AutheticationRoute,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;