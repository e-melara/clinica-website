'use strict';

import axios from 'axios';
import store from '../store';

const authApi = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/',
});

// request
authApi.interceptors.request.use(
  (config) => {
    if (config.headers) {
      const token = window.localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      }
      config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log({ error });
    const errMessage = error.response?.data?.message;
    if (errMessage.includes('not logged in') && !originalRequest._retry) {
      originalRequest._retry = true;
      // await refreshAccessTokenFn()
      return authApi(originalRequest);
    }

    if (error.response) {
      const {
        data: { statusCode: status, message },
      } = error.response;
      if (status !== 401) {
        store.commit('utils/setAlert', {
          show: true,
          message: message,
          type: 'error',
        });
      } else {
        document.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default authApi;
