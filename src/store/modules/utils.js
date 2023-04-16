export const utilStore = {
  namespaced: true,
  state: {
    alert: {
      show: false,
      type: 'info',
      message: '',
      timeout: 2500,
    },
    loader: false,
    sideBar: true,
    miniVariant: true,
  },
  getters: {
    getAlert: (state) => {
      return state.alert;
    },
  },
  mutations: {
    setAlert: (state, payload) => {
      state.alert = payload;
    },
    setLoader: (state, payload) => {
      state.loader = payload;
    },
    setSideBar: (state, payload) => {
      state.sideBar = payload;
    },
    setMiniVariant: (state, payload) => {
      state.miniVariant = payload;
    },
  },
  actions: {},
};
