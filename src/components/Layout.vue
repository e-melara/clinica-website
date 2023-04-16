<template>
  <v-app>
    <app-loader v-if="loader"></app-loader>
    <app-header></app-header>
    <app-aside-bar :menu="menu"></app-aside-bar>
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<script lang="js">

import { mapState, mapMutations } from "vuex";

export default {
  name: 'LayoutComponent',
  methods: {
    ...mapMutations(["existAuthToken"]),
  },
  computed: {
    ...mapState("utils", ["loader", "menu"]),
  },
  async created() {
    await this.existAuthToken();
    console.log('llamando desde layout mounted');
  },
};
</script>

<style></style>
