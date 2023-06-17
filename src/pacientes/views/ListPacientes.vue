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
                      <v-icon dark> mdi-plus</v-icon>
                      Agregar Paciente
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
            <template #options="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mx-2"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    color="indigo"
                    @click="addHistorialClinico(item)"
                  >
                    <v-icon dark> mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Agregar o editar el historial clinico</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    class="mx-2"
                    text
                    color="primary"
                    @click="editPaciente(item)"
                  >
                    <v-icon dark> mdi-pencil-plus-outline</v-icon>
                  </v-btn>
                </template>
                <span>Editar paciente</span>
              </v-tooltip>
            </template>
          </App-Table>
        </v-card>
      </v-col>
    </v-row>
    <ModalAddPaciente
      v-if="open"
      :dialog="open"
      :generos="generos"
      :contactos="contactos"
      :municipios="municipios"
      :documentos="documentos"
      @closeOrSave="onCloseOrSave"
      :departamentos="departamentos"
      @change-departamento="onChangeDepartamento"
      :isEdit="isEdit"
      :dataEdit="dataEdit"
    />
  </v-container>
</template>

<script lang="js">
import { mapMutations, mapState, mapActions } from 'vuex';
import ModalAddPaciente from '../components/ModalAddPaciente.vue';

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
        width: '40%',
        value: 'nombre_del_paciente',
      }, {
        text: 'Fecha de Nacimiento',
        sortable: false,
        width: '15%',
        value: 'fecha_nacimiento',
      }, {
        text: 'Edad',
        sortable: false,
        value: 'edad',
      }],
      q: null,
      dataEdit: {},
      isEdit: false,
      setTimeout: null,
    };
  },
  computed: {
    ...mapState('pacient', ['open', 'contactos', 'documentos', 'municipios', 'departamentos', 'generos', 'loader', 'list', 'pagination']),
  },
  methods: {
    ...mapMutations('pacient', ['setOpen']),
    ...mapActions('pacient', ['getInfo', 'getMunicipios', 'save', 'getList', 'getFindOne']),
    addHistorialClinico({ id }) {
      this.$router.replace({ name: 'patients-historial-clinico', params: { id } });
    },
    updatePagination({ page, itemsPerPage }) {
      this.getList({
        pagina: page,
        cantidad_por_pagina: itemsPerPage,
      });
    },
    onChangeDepartamento(id) {
      this.getMunicipios(id);
    },
    openModalAdd() {
      this.getInfo().then(() => {
        this.isEdit = false;
        this.setOpen(true);
      });
    },
    onCloseOrSave({ type, forms }) {
      if (type === 'close') {
        this.setOpen(false);
        return;
      }
      if(type === 'save') {
        this.save({ ...forms }).then(() => {
          this.setOpen(false);
          this.onSearch();
        });
      } else {
        this.setOpen(false);
        console.log(forms)
      }
    },
    onSearch() {
      if (this.setTimeout) {
        clearTimeout(this.setTimeout);
      }
      this.setTimeout = setInterval(() => {
        this.getList({
          q: this.q || '',
          pagina: 1,
          cantidad_por_pagina: this.pagination.cantidad_por_pagina,
        });
        clearInterval(this.setTimeout);
      }, 500);
    },
    async editPaciente(paciente) {
      this.isEdit = true;
      const { id } = paciente;
      try {
        await Promise.all([this.getInfo(), this.getFindOne(+id)]).then((data) => {
          this.dataEdit = data[1];
          this.isEdit = true;
          this.setOpen(true);
        });
      } catch (e) {
        this.$store.commit('utils/setAlert', {
          show: true,
          type: 'error',
          message: 'Tenemos un problema para editar el paciente',
        });
      }
    },
  },
};
</script>

<style></style>
