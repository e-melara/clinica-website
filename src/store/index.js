import Vue from 'vue';
import Vuex from 'vuex';
import jwtDecode from 'jwt-decode';

import authApi from '../plugins/axios';
import { utilStore } from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    roles: [],
    rutas: [],
    userInfo: {},
    isAuthenticate: false,
  },
  mutations: {
    logout(state) {
      state.roles = [];
      state.rutas = [];
      state.userInfo = {};
      state.isAuthenticate = false;
      localStorage.clear();
    },
    setAuth(state, payload) {
      const { token, user } = payload;
      const decoded = jwtDecode(token);
      // state
      state.userInfo = user;
      state.roles = decoded.roles;
      state.isAuthenticate = true;
      state.rutas = decoded.rutas;

      // localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(user));
    },
    existAuthToken(state) {
      const token = localStorage.getItem('token');
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (token) {
        const decoded = jwtDecode(token);
        state.roles = decoded.roles;
        state.isAuthenticate = true;
        state.rutas = decoded.rutas;
      }
      if (userInfo) {
        state.userInfo = userInfo;
      }
    },
  },
  actions: {
    async login({ commit }, params = {}) {
      commit('utils/setLoader', true);
      try {
        const { data } = await authApi.post('/api/auth/login', params);
        commit('setAuth', data);
        return Promise.resolve(true);
      } catch (error) {
        return Promise.reject(error);
      } finally {
        commit('utils/setLoader', false);
      }
    },
  },
  getters: {
    getRoles: (state) => state.roles,
    getIsAuthenticate: (state) => state.isAuthenticate,
  },
  modules: {
    utils: utilStore,
  },
});
