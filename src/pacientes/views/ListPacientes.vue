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
    <ModalAddPaciente
      :dialog="open"
      :generos="generos"
      :contactos="contactos"
      :municipios="municipios"
      :documentos="documentos"
      @closeOrSave="onCloseOrSave"
      :departamentos="departamentos"
      @change-departamento="onChangeDepartamento"
    />
  </v-container>
</template>

<script lang="js">
import { mapMutations, mapState, mapActions } from "vuex";
import ModalAddPaciente from "../components/ModalAddPaciente.vue";
export default {
  name: 'ListPacientes',
  components: {
    ModalAddPaciente,
  },
  data: () => {
    return {
      headers: [],
      desserts: [],
    }
  },
  computed: {
    ...mapState('pacient', ['open', 'contactos', 'documentos', 'municipios', 'departamentos', 'generos', 'loader']),
  },
  methods: {
    ...mapMutations('pacient', ['setOpen']),
    ...mapActions('pacient', ['getInfo', 'getMunicipios', 'save']),
    updatePagination() {},
    onChangeDepartamento(id) {
      this.getMunicipios(id)
    },
    openModalAdd() {
      this.setOpen(true)
    },
    onCloseOrSave({type, forms}) {
      if(type === 'close') {
        this.setOpen(false)
        return;
      }
      this.save({...forms}).then(() => {
        this.setOpen(false)
      });
    }
  },
  mounted() {
    this.getInfo()
  }
}
</script>

<style></style>
