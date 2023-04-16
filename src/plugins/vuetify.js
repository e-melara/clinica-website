import Vue from 'vue';
import es from 'vuetify/lib/locale/es';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    lang: {
      locales: { es },
      current: 'es',
    },
    themes: {
      light: {
        primary: '#282828',
      },
      dark: {
        primary: '#2f3032',
      },
    },
    breakpoint: {
      mobileBreakpoint: 'sm',
    },
  },
});
