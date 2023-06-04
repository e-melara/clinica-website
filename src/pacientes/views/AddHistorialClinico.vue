<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar color="primary accent-4" dark flat>
            <v-toolbar-title>Historial Clinico</v-toolbar-title>
            <template v-slot:extension>
              <v-tabs v-model="current" fixed-tabs slider-color="white">
                <v-tab v-for="(item, index) in items" :key="index">
                  {{ item.text }}
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>
          <v-tabs-items v-model="current">
            <v-tab-item v-for="(item, index) in items" :key="index">
              <v-card flat>
                <v-card-text>
                  <component @save="save" :is="item.component"></component>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="js">

import CondicionesSalud from "../components/Tabs/CondicionesSalud.vue";
import UsoDeAlcoholDrogas from "../components/Tabs/UsoDeAlcoholDrogas.vue";
import AntecendesPersonales from "../components/Tabs/AntecendesPersonales.vue";
import AntecendesFamiliares from "../components/Tabs/AntecendesFamiliares.vue";
import { mapActions } from "vuex";

const items = [{
  text: 'Antecendes Familiares',
  component: AntecendesFamiliares,
}, {
  text: 'Antecendes Personales',
  component: AntecendesPersonales,
}, {
  text: 'Uso de Alcohol y Drogas',
  component: UsoDeAlcoholDrogas,
}, {
  text: 'Condicion de Salud',
  component: CondicionesSalud,
}]

export default {
  name: 'AddHistorialClinico',
  data: () => ({
    current: null,
    items,
  }),
  methods: {
    ...mapActions('pacient', ['getHistorial', 'saveStepPaciente']),
    save({step, data}) {
      const { id } = this.$route.params;
      this.saveStepPaciente({ paciente_id: id, step_id: step, forms: data})
    }
  },
  watch: {
    current(val) {
      const { id } = this.$route.params;
      this.getHistorial({step_id: (val + 1), paciente_id: id });
    },
  },
};
</script>

<style></style>
