import Vue from 'vue';
import Vuex from 'vuex';
// import jwtDecode from 'jwt-decode';

import { utilStore } from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // token: null,
    // userInfo: {},
  },
  mutations: {
    // setToken(state, payload) {
    //   state.token = payload;
    // },
    // setUserInfo(state, payload) {
    //   state.userInfo = payload;
    // },
  },
  actions: {
    // setAuth({ commit }, payload) {
    //   const { token, refreshToken } = payload;
    //   commit('setUserInfo', jwtDecode(token));
    //   commit('setToken', token);
    //   localStorage.setItem('token', token);
    //   localStorage.setItem('refresh_token', refreshToken);
    // },
  },
  modules: {
    utils: utilStore,
  },
});
