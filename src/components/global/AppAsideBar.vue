<template>
  <v-navigation-drawer
    color="blueMinsal"
    fixed
    app
    mini-variant-width="70"
    v-model="drawer"
    :mini-variant="miniVariant"
  >
    <template v-slot:prepend>
      <div class="pa-5 mt-2 d-flex align-center justify-center">
        <img :src="Logo" width="65%" height="auto" />
      </div>
    </template>

    <v-list dense nav rounded expand v-if="!miniVariant">
      <span v-for="(item, i) in rutas" :key="i">
        <v-list-item-group v-model="group">
          <v-list-item
            :to="item.url"
            active-class=" orange-dark--text"
            class="list-items dark-blue--text"
          >
            <v-list-item-icon class="ml-3 mr-5">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title class="text-capitalize text-wrap">
              {{ item.nombre }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </span>
    </v-list>
    <v-list v-else>
      <span v-for="item in rutas" :key="item.id">
        <div>
          <v-menu open-on-hover offset-x>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-group>
                <v-list-item v-bind="attrs" v-on="on" :ripple="false" :to="item.url">
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list-item-group>
            </template>
            <v-list class="py-0">
              <v-subheader>
                {{ item.nombre }}
              </v-subheader>
            </v-list>
          </v-menu>
        </div>
      </span>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="js">
import { mapMutations, mapState } from "vuex";
import Logo from "../../assets/images/logo/logo.png";

export default {
  name: 'AppAsideBar',
  props: {
    menu: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      expandMenu: false,
      group: null,
      Logo
    };
  },
  methods: {
    ...mapMutations("utils", ["setSideBar", "setMiniVariant"]),
    hideDrawer() {
      if (this.$vuetify.breakpoint.mobile) {
        this.drawer = false;
      }
    },
  },
  computed: {
    ...mapState("utils", ["sideBar", "miniVariant"]),
    ...mapState(['rutas']),
    drawer: {
      get() {
        return this.sideBar;
      },
      set(value) {
        this.setSideBar(value);
      },
    },
  },
  watch: {
    group() {
      if (this.$vuetify.breakpoint.mobile) {
        this.drawer = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list-items {
  border-radius: 0px !important;
  padding: 8px 10px 10px 10px;
}
.v-icon {
  color: #fff;
}
.v-list-item__title {
  color: #fff;
  font-weight: 500 !important;
  font-size: 0.85rem !important;
  text-transform: uppercase !important;
}
</style>
