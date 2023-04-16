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
        blueMinsal: '#175EFB',
        blueGrayMinsal: '#6A83BE',
        blueDarkMinsal: '#2D52A8',
        bgMinsal: '#fffef7',
        bgWhite: '#FFFFFF',
        primary: '#175EFB',
        background: '#FFFEF7',
        'dark-blue': '#313945',
        'orange-dark': '#EF9D42',
        titulosBanner: '#313945',
        footer: '#313945',
        divider: '#F4D186',
        chart: '#AD83B7',
        'blue-primary': '#509ED7',
        secondary: '#85F3B1',
        'orange-light': '#FEF9ED',
        'orange-opacity': '#FBE5C9',
        'orange-border': '#ef9d42',
        'header-orange-light': 'fbe6cf',
        colorSheet: '#FBE5C9',
        blueDefault: '#509ED7',
        stepperCheck: '#EF9D42',
        bgApp: '#FFFEF7',
      },
      dark: {
        bgMinsal: '#2f3032',
        blueMinsal: '#175EFB',
        blueGrayMinsal: '#6A83BE',
        blueDarkMinsal: '#2D52A8',
        primary: '#175EFB',
      },
    },
    breakpoint: {
      mobileBreakpoint: 'sm',
    },
  },
});
