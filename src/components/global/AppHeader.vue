<template>
  <v-app-bar app style="height: 75px" :elevation="0" prominent>
    <v-col cols="6" class="d-flex flex-rows align-center" v-if="$vuetify.breakpoint.width > 338">
      <v-app-bar-nav-icon @click.stop="setDrawer"></v-app-bar-nav-icon>
    </v-col>
    <v-col cols="6" class="d-flex flex-rows align-center justify-end">
      <v-menu offset-y transition="scroll-y-transition" rounded="lg">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" elevation="" small>
            <v-icon>mdi-chevron-down</v-icon>
            {{ getNombrePersona }}
          </v-btn>
        </template>
        <v-list dense nav>
          <v-list-item @click="cerrarSession()" class="my-0">
            <v-list-item-icon>
              <v-icon size="20">mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Cerrar Sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-col>
  </v-app-bar>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

import Logo from '../../assets/images/logo/logo.png';

export default {
  name: 'AppHeader',
  data() {
    return {
      Logo,
    };
  },
  methods: {
    ...mapMutations(['logout']),
    ...mapMutations('utils', ['setSideBar', 'setMenu', 'setMiniVariant']),
    async cerrarSession() {
      this.logout();
      this.$router.replace('/login');
    },
    setDrawer() {
      if (this.$vuetify.breakpoint.mobile) {
        if (this.miniVariant) {
          this.setMiniVariant(false);
        }
        this.setSideBar(!this.sideBar);
      } else {
        if (!this.sideBar) {
          this.setSideBar(true);
        }
        this.setMiniVariant(!this.miniVariant);
      }
    },
  },
  computed: {
    ...mapState('utils', {
      sideBar: 'sideBar',
      miniVariant: 'miniVariant',
    }),
    ...mapState(['userInfo']),
    getNombrePersona() {
      const { nombre, apellido } = this.userInfo.persona;
      return `${nombre} ${apellido}`;
    },
  },
};
</script>

<style scoped></style>
