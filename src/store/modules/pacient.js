import moment from 'moment';

import authApi from '../../plugins/axios';
import { calculaEdad } from '../../plugins/utils';

export const pacientStore = {
  namespaced: true,
  state: {
    generos: [],
    open: false,
    loader: false,
    contactos: [],
    documentos: [],
    municipios: [],
    loading: false,
    departamentos: [],

    list: [],
    pagination: {
      total: 0,
      pagina: 1,
      cantidad_por_pagina: 10,
    },
  },
  mutations: {
    setOpen(state, payload) {
      state.open = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setMunicipio(state, { municipio }) {
      state.municipios = municipio;
    },
    settearData(state, [departamentos, generos, documentos, contactos]) {
      state.loader = true;
      state.municipios = [];
      state.generos = generos?.data;
      state.contactos = contactos?.data;
      state.documentos = documentos?.data;
      state.departamentos = departamentos?.data;
    },
    setList(state, { items, meta }) {
      state.list = items.map((item, index) => {
        return {
          id: item.id,
          index: index + 1,
          codigo: item.numero_expendiente,
          edad: calculaEdad(item.fechaNaacimiento),
          nombre_del_paciente: `${item.nombre} ${item.apellido}`,
          fecha_nacimiento: moment(item.fechaNaacimiento).format('DD/MM/YYYY'),
        };
      });
      state.pagination = {
        total: meta.total,
        pagina: meta.pagina,
        cantidad_por_pagina: meta.cantidad_por_pagina,
      };
    },
  },
  actions: {
    async getList({ commit }, { pagina, cantidad_por_pagina, q = '' }) {
      try {
        commit('utils/setLoader', true, { root: true });
        const { data } = await authApi.get(
          `/api/pacientes?pagina=${pagina}&cantidad_por_pagina=${cantidad_por_pagina}&q=${q}&orden=DESC`
        );
        commit('utils/setLoader', false, { root: true });
        commit('setList', data);
      } catch (error) {
        console.log({ error });
      } finally {
        commit('utils/setLoader', false, { root: true });
      }
    },
    async getInfo({ commit, state }) {
      if (state.loader) return Promise.resolve();
      try {
        commit('utils/setLoader', true, { root: true });
        const params = await Promise.all([
          authApi.get('/api/customs/departamentos'),
          authApi.get('/api/customs/generos'),
          authApi.get('/api/customs/documentos'),
          authApi.get('/api/customs/contactos'),
        ]);
        commit('settearData', params);
        return Promise.resolve();
      } catch (error) {
        console.log({ error });
      } finally {
        commit('utils/setLoader', false, { root: true });
      }
    },
    async getMunicipios({ commit }, id) {
      try {
        commit('setMunicipio', []);
        commit('setLoading', true);
        commit('utils/setLoader', true, { root: true });
        const { data } = await authApi.get(`/api/customs/departamentos/${id}`);
        commit('setMunicipio', data);
      } catch (error) {
        console.log({ error });
      } finally {
        commit('setLoading', false);
        commit('utils/setLoader', false, { root: true });
      }
    },
    async save({ commit }, forms) {
      try {
        commit('setLoading', true);
        commit('utils/setLoader', true, { root: true });
        const { data } = await authApi.post(`/api/pacientes`, forms);
        commit('setLoading', false);
        commit('utils/setLoader', false, { root: true });
        return Promise.resolve(data);
      } catch (error) {
        commit('setLoading', false);
        commit('utils/setLoader', false, { root: true });
        return Promise.reject(error);
      }
    },
  },
};
