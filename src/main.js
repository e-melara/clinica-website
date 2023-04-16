import Vue from 'vue';

import App from './App.vue';
import store from './store';
import router from './router';
import vuetify from './plugins/vuetify';
import { utils } from './plugins/utils';
import loadComponents from './plugins/loadComponents';

Vue.config.productionTip = false;
loadComponents(Vue);

utils(store);

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
