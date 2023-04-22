<template>
  <v-dialog :value="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="$emit('closeOrSave', { type: 'close' })">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Agregar paciente</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="validateForm"> Guardar </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form" v-model="valid" class="media-query">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="forms.nombres"
                  outlined
                  :counter="50"
                  label="Nombres"
                  required
                  filled
                  :rules="[rules.required, rules.maxInput(50, forms.nombres), rules.alphaSpace]"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="forms.apellidos"
                  filled
                  outlined
                  :counter="50"
                  label="Apellidos"
                  required
                  :rules="[rules.required, rules.maxInput(50, forms.apellidos), rules.alphaSpace]"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-menu
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  ref="menu"
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      filled
                      v-model="fechaNacimiento"
                      outlined
                      label="Fecha de Nacimiento"
                      append-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      :rules="[rules.required]"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="forms.fechaNacimiento" locale="es-sv" :max="maxDate">
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(forms.fechaNacimiento)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-select
                  :rules="[rules.required]"
                  filled
                  outlined
                  v-model="forms.genero"
                  label="Genero"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-select
                  outlined
                  :rules="[rules.required]"
                  v-model="forms.departamento"
                  label="Departamento"
                  required
                  filled
                ></v-select>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-select
                  filled
                  outlined
                  v-model="forms.municipio"
                  label="Municipio"
                  required
                  :rules="[rules.required]"
                ></v-select>
              </v-col>
            </v-row>
            <v-textarea
              outlined
              v-model="forms.direccion"
              filled
              label="Dirección"
              auto-grow
              counter="250"
              :rules="[rules.required, rules.maxInput(250, forms.direccion)]"
            ></v-textarea>
            <v-divider></v-divider>
            <TableContactoAndDocumento
              :items="itemsDocumentos"
              :txt-label-options="labelObj"
              title="contactos del paciente"
            />
            <v-divider></v-divider>
            <TableContactoAndDocumento
              :items="itemsDocumentos"
              :txt-label-options="labelObj"
              title="Documentos del paciente"
            />
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="js">
import moment from "moment";

import TableContactoAndDocumento from "./TableContactoAndDocumento.vue";

export default {
  name: 'ModalAddPaciente',
  components: {
    TableContactoAndDocumento
  },
  data: () => ({
    rules: {},
    menu: false,
    valid: false,
    labelObj: {
      label: 'Digite el numero del contacto',
      //TODO: pendiente la validacion de los numeros
      rules: []
    },
    maxDate: new Date().toISOString().substr(0, 10),
    forms: {
      nombres: '',
      apellidos: '',
      fechaNacimiento: '',
      departamento: '',
      genero: '',
      municipio: '',
      direccion: '',
      contactons: [],
      documentos: [],
    }
  }),
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    fechaNacimiento() {
      const {fechaNacimiento} = this.forms;
      if(!fechaNacimiento) {
        return ''
      }
      const momentDate = moment(fechaNacimiento);
      momentDate.locale('es-sv');
      return momentDate.format('dddd, MMMM Do YYYY');
    },
    itemsDocumentos() {
      return {
        label: 'Seleccione el tipo de documento',
        rules: [this.rules.required],
        data: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      }
    }
  },
  methods: {
    validateForm() {
      if (this.$refs.form.validate()) {
        alert('Form Submitted!');
      }
    },
  },
  created() {
    this.rules = {...this.rulesValidations}
  }
};
</script>

<style scope>
.media-query {
  padding: 50px 0px;
}
@media screen and (min-width: 1024px) {
  .media-query {
    padding: 50px 80px;
  }
}
</style>
