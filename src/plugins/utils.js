import Vue from 'vue';

export const utils = (store) => {
  Vue.prototype.showOrHideLoader = (showOrHide) => {
    store.commit('utils/setLoader', showOrHide);
  };

  Vue.prototype.showAlert = async (alert) => {
    await store.commit('utils/setAlert', alert);
  };
};
