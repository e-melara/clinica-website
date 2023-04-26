<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar color="deep-purple accent-4" dark flat>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>Page title</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>

            <template v-slot:extension>
              <v-tabs v-model="currentItem" fixed-tabs slider-color="white">
                <v-tab v-for="item in items" :key="item" :href="'#tab-' + item">
                  {{ item }}
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="js">
export default {
  name: 'AddHistorialClinico',
};
</script>

<style></style>
