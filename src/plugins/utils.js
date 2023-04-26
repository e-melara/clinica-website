import Vue from 'vue';
import moment from 'moment';

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
    numeric: (v) => /^[a-zA-Z0-9]\s*$/.test(v) || 'El campo solo puede contener letras y números',
    alpha: (v) => /^[a-zA-Z]\s*$/.test(v) || 'El campo solo puede contener letras',
    maxInput: (max, v) =>
      (v && v.length <= parseInt(max)) || `El máximo de caracteres es de ${max}`,
    minInput: (min, v) =>
      (v && v.length >= parseInt(min)) || `El mínimo de caracteres es de ${min}`,
    alphaSpace: (v) => /^[a-zA-Z\s]*$/.test(v) || 'El campo solo puede contener letras',
  };
};

export const calculaEdad = (fechaNacimiento) => {
  let resultado = '';
  const a = moment();
  const b = moment(fechaNacimiento);

  const years = a.diff(b, 'year');
  b.add(years, 'years');

  const months = a.diff(b, 'months');
  b.add(months, 'months');

  const days = a.diff(b, 'days');

  if (years == 0) {
    if (months <= 1) {
      if (days <= 1) {
        resultado = months + ' mes ' + days + ' dia';
      } else {
        resultado = months + ' mes ' + days + ' dias';
      }
    } else {
      if (days <= 1) {
        resultado = months + ' meses ' + days + ' dia';
      } else {
        resultado = months + ' meses ' + days + ' dias';
      }
    }
  } else {
    if (years == 1) {
      resultado = years + ' año';
    } else {
      resultado = years + ' años';
    }
  }
  return resultado;
};
