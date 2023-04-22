import authApi from '../../plugins/axios';

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
  },
  actions: {
    async getInfo({ commit }) {
      try {
        commit('utils/setLoader', true, { root: true });
        const params = await Promise.all([
          authApi.get('/api/customs/departamentos'),
          authApi.get('/api/customs/generos'),
          authApi.get('/api/customs/documentos'),
          authApi.get('/api/customs/contactos'),
        ]);
        commit('settearData', params);
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
