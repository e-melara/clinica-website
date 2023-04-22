<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-container fluid>
              <v-row>
                <v-col cols="12">
                  <h3>Listado de Pacientes</h3>
                </v-col>
              </v-row>
            </v-container>
          </v-card-title>
          <App-Table
            :headers="headers"
            :data="desserts"
            :loading="false"
            :total="desserts.length"
            keyItem="name"
            @update:options="updatePagination"
          >
            <template #top>
              <v-container fluid>
                <v-row>
                  <v-col cols="2">
                    <v-btn dark color="primary" large block @click="openModalAdd">
                      <v-icon dark> mdi-plus </v-icon> Agregar Paciente
                    </v-btn>
                  </v-col>

                  <v-col cols="4" offset="6">
                    <v-text-field
                      append-icon="mdi-magnify"
                      label="Buscar paciente"
                      single-line
                      hide-details
                      outlined
                    />
                  </v-col>
                </v-row>
              </v-container>
            </template>
          </App-Table>
        </v-card>
      </v-col>
    </v-row>
    <ModalAddPaciente :dialog="open" @closeOrSave="onCloseOrSave" />
  </v-container>
</template>

<script lang="js">
import { mapMutations, mapState } from "vuex";
import ModalAddPaciente from "../components/ModalAddPaciente.vue";
export default {
  name: 'ListPacientes',
  components: {
    ModalAddPaciente,
  },
  data: () => {
    return {
      headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: 1,
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: 1,
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: 7,
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: 8,
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: 16,
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: 0,
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: 2,
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: 45,
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: 22,
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: 6,
          },
        ],
    }
  },
  computed: {
    ...mapState('pacient', ['open']),
  },
  methods: {
    ...mapMutations('pacient', ['setOpen']),
    updatePagination(options) {
      console.log({ options })
    },
    openModalAdd() {
      this.setOpen(true)
    },
    onCloseOrSave({type}) {
      if(type === 'close') {
        this.setOpen(false)
      }
    }
  }
}
</script>

<style></style>
