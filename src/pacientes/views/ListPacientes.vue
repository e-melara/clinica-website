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
            :data="list"
            keyItem="name"
            :loading="false"
            :total="pagination.total"
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
                      v-model="q"
                      outlined
                      single-line
                      hide-details
                      @keydown="onSearch"
                      append-icon="mdi-magnify"
                      label="Buscar paciente"
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
      headers: [{
        text: '#',
        align: 'start',
        sortable: false,
        value: 'index',
      }, {
        text: 'Codigo',
        align: 'start',
        sortable: false,
        value: 'codigo',
      }, {
        text: 'Nombre del paciente',
        sortable: false,
        value: 'nombre_del_paciente',
      }, {
        text: 'Fecha de Nacimiento',
        sortable: false,
        value: 'fecha_nacimiento',
      }, {
        text: 'Edad',
        sortable: false,
        value: 'edad',
      }],
      q: null,
      setTimeout: null
    }
  },
  computed: {
    ...mapState('pacient', ['open', 'contactos', 'documentos', 'municipios', 'departamentos', 'generos', 'loader', 'list', 'pagination']),
  },
  methods: {
    ...mapMutations('pacient', ['setOpen']),
    ...mapActions('pacient', ['getInfo', 'getMunicipios', 'save', 'getList']),
    updatePagination({page, itemsPerPage}) {
      this.getList({
        pagina: page,
        cantidad_por_pagina: itemsPerPage
      })
    },
    onChangeDepartamento(id) {
      this.getMunicipios(id)
    },
    openModalAdd() {
      this.getInfo().then(() => {
        this.setOpen(true)
      });
    },
    onCloseOrSave({type, forms}) {
      if(type === 'close') {
        this.setOpen(false)
        return;
      }
      this.save({...forms}).then(() => {
        this.setOpen(false)
        this.onSearch()
      });
    },
    onSearch() {
      if(this.setTimeout) {
        clearTimeout(this.setTimeout)
      }
      this.setTimeout = setInterval(() => {
        this.getList({
          q: this.q || '',
          pagina: 1,
          cantidad_por_pagina: this.pagination.cantidad_por_pagina
        })
        clearInterval(this.setTimeout)
      }, 500)
    }
  },
}
</script>

<style></style>
