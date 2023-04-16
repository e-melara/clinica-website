import Vue from 'vue';

export const utils = (store) => {
  Vue.prototype.showOrHideLoader = (showOrHide) => {
    store.commit('utils/setLoader', showOrHide);
  };

  Vue.prototype.showAlert = async (alert) => {
    await store.commit('utils/setAlert', alert);
  };

  Vue.prototype.rulesValidations = {
    required: (v) => !!v || 'Este campo es requerido',
    email: (v) => /.+@.+\..+/.test(v) || 'El correo electrónico no es válido',
    min: (v) => (v && v.length >= 7) || 'El mínimo de caracteres es 7',
    max: (v) => (v && v.length <= 14) || 'El máximo de caracteres es 14',
    alphaNumeric: (v) =>
      /^[a-zA-Z0-9]*$/.test(v) || 'El campo solo puede contener letras y números',
  };
};
