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
        config.headers.Authorization = `Bearer ${token}`;
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

export const trycatch = async (url, params, commit, method = 'get') => {
  const response = {
    promise: undefined,
    error: false,
  }
  try {
    commit('setLoading', true)
    commit('utils/setLoader', true, { root: true })
    const { data } = await authApi[method.toLowerCase()](url, params)
    response.promise = Promise.resolve(data)  
   } catch (error) {
    response.promise = Promise.reject(error)
    response.error = true
  } finally {
    commit('setLoading', false)
    commit('utils/setLoader', false, { root: true })
  }

  return response
}

export default authApi;
