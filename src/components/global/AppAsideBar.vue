<template>
  <v-navigation-drawer
    color="primary"
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
      <span v-for="(item, i) in menu" :key="i">
        <v-list-group
          active-class="orange-dark--text"
          v-if="item.childrens && item.childrens.length"
          :group="item.uri"
          append-icon=""
        >
          <template v-slot:activator>
            <v-list-item-title class="text-capitalize text-wrap dark-blue--text">
              {{ item.nombre }}
            </v-list-item-title>
          </template>
          <template #prependIcon>
            <v-icon class="ml-3" color="dark-blue">{{ item.icono }}</v-icon>
          </template>
          <div class="submenu mt-n2 py-2">
            <v-list-item
              v-for="(child, j) in item.childrens"
              :key="j"
              :to="child.uri"
              active-class="orange-dark--text"
            >
              <v-list-item-title class="text-capitalize pl-4">
                <span>{{ child.nombre }}</span>
              </v-list-item-title>
            </v-list-item>
          </div>
        </v-list-group>
        <v-list-item-group v-model="group" v-else>
          <v-list-item
            :to="item.uri"
            active-class=" orange-dark--text"
            class="list-items dark-blue--text"
          >
            <v-list-item-icon class="ml-3 mr-5">
              <v-icon>{{ item.icono }}</v-icon>
            </v-list-item-icon>

            <v-list-item-title class="text-capitalize text-wrap">
              {{ item.nombre }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </span>
    </v-list>
    <v-list v-else>
      <span v-for="item in menu" :key="item.id">
        <div>
          <v-menu open-on-hover offset-x>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-group color="orange-dark">
                <v-list-item
                  v-bind="attrs"
                  v-on="on"
                  :ripple="false"
                  :to="item.childrens.length ? '' : item.uri"
                >
                  <v-list-item-icon>
                    <v-icon>{{ item.icono }}</v-icon>
                  </v-list-item-icon>
                </v-list-item>
              </v-list-item-group>
            </template>

            <v-list class="py-0">
              <v-subheader class="text-subtitle-1 font-weight-bold black--text text-capitalize">{{
                item.nombre
              }}</v-subheader>
              <v-divider v-if="item.childrens.length"></v-divider>
              <v-list-item
                v-for="child in item.childrens"
                :key="child.id"
                :to="child.uri"
                active-class="orange-dark--text"
              >
                <v-list-item-title class="text-capitalize">
                  <span>{{ child.nombre }}</span>
                </v-list-item-title>
              </v-list-item>
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
  border: 1px solid #c5c8cf;
  margin: 8px 10px 10px 10px;
}
.v-icon {
  color: #313945;
}

.submenu {
  border: 1px solid #c5c8cf !important;
  border-top: none !important;
  border-radius: 25px;
  margin-left: 10px;
  margin-right: 10px;
}

::v-deep .v-list-group__header.v-list-item {
  border: 1px solid #c5c8cf;
  border-radius: 50px;

  margin: 8px 10px 10px 10px;
}
</style>
