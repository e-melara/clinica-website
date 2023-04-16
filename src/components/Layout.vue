<template>
  <v-app>
    <app-loader v-if="loader"></app-loader>
    <app-header></app-header>
    <app-aside-bar :menu="menu"></app-aside-bar>
    <v-main class="bgMinsal">
      <div class="pa-2 pa-sm-4">
        <router-view :key="$route.fullPath" />
      </div>
    </v-main>
  </v-app>
</template>

<script lang="js">

import { mapState } from "vuex";

export default {
  name: 'LayoutComponent',
  computed: {
    ...mapState("utils", ["loader", "menu"]),
  },
};
</script>

<style></style>
