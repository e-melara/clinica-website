export const pacientStore = {
  namespaced: true,
  state: {
    open: false,
  },
  mutations: {
    setOpen(state, payload) {
      state.open = payload;
    },
  },
  actions: {},
};
