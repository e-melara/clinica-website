<template>
  <v-dialog :value='dialog' transition='dialog-bottom-transition'>
    <v-card>
      <v-toolbar dark color='primary'>
        <v-btn :disabled='valid' icon dark @click="$emit('closeOrSave', { type: 'close' })">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Agregar paciente</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click='validateForm'> Guardar</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-form ref='form' v-model='valid' class='media-query'>
          <v-container>
            <v-row>
              <v-col cols='12' sm='6' md='6'>
                <v-text-field
                  v-model='forms.nombre'
                  outlined
                  :counter='50'
                  label='Nombres'
                  required
                  filled
                  :rules='[rules.required, rules.maxInput(50, forms.nombre), rules.alphaSpace]'
                ></v-text-field>
              </v-col>

              <v-col cols='12' sm='6' md='6'>
                <v-text-field
                  v-model='forms.apellido'
                  filled
                  outlined
                  :counter='50'
                  label='Apellidos'
                  required
                  :rules='[rules.required, rules.maxInput(50, forms.apellido), rules.alphaSpace]'
                ></v-text-field>
              </v-col>

              <v-col cols='12' sm='6' md='6'>
                <v-menu
                  v-model='menu'
                  :close-on-content-click='false'
                  transition='scale-transition'
                  offset-y
                  ref='menu'
                  min-width='auto'
                >
                  <template v-slot:activator='{ on, attrs }'>
                    <v-text-field
                      filled
                      v-model='fechaNacimiento'
                      outlined
                      label='Fecha de Nacimiento'
                      append-icon='mdi-calendar'
                      readonly
                      v-bind='attrs'
                      :rules='[rules.required]'
                      v-on='on'
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model='forms.fecha_nacimiento' locale='es-sv' :max='maxDate'>
                    <v-spacer></v-spacer>
                    <v-btn text color='primary' @click='menu = false'> Cancel</v-btn>
                    <v-btn text color='primary' @click='$refs.menu.save(forms.fecha_nacimiento)'>
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols='12' sm='6' md='6'>
                <v-select
                  :rules='[rules.required]'
                  filled
                  outlined
                  v-model='forms.genero'
                  label='Genero'
                  required
                  :items='generos'
                  item-value='id'
                  item-text='nombre'
                ></v-select>
              </v-col>

              <v-col cols='12' sm='6' md='6'>
                <v-select
                  outlined
                  :items='departamentos'
                  item-value='id'
                  item-text='nombre'
                  :rules='[rules.required]'
                  v-model='forms.departamento'
                  label='Departamento'
                  required
                  filled
                  @change='changeDepartamento'
                ></v-select>
              </v-col>

              <v-col cols='12' sm='6' md='6'>
                <v-select
                  filled
                  outlined
                  required
                  item-value='id'
                  item-text='nombre'
                  label='Municipio'
                  :items='municipios'
                  v-model='forms.municipio'
                  :rules='[rules.required]'
                  :disabled='municipios.length === 0'
                ></v-select>
              </v-col>
            </v-row>
            <v-textarea
              outlined
              v-model='forms.direccion'
              filled
              label='Dirección'
              auto-grow
              counter='250'
              :rules='[rules.required, rules.maxInput(250, forms.direccion)]'
            ></v-textarea>
            <v-divider></v-divider>
            <TableContactoAndDocumento
              ref='tableContacto'
              :items='itemsContactos'
              :txt-label-options='labelObj'
              title='contactos del paciente'
            />
            <v-divider></v-divider>
            <TableContactoAndDocumento
              ref='tableDocumento'
              :items='itemsDocumentos'
              :txt-label-options='labelObj'
              title='Documentos del paciente'
            />
          </v-container>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang='js'>
import moment from 'moment';

import TableContactoAndDocumento from './TableContactoAndDocumento.vue';

export default {
  name: 'ModalAddPaciente',
  components: {
    TableContactoAndDocumento,
  },
  data: () => ({
    rules: {},
    menu: false,
    valid: false,
    labelObj: {
      label: 'Digite el numero del contacto',
      rules: [],
    },
    maxDate: new Date().toISOString().substr(0, 10),
    forms: {
      nombre: '',
      apellido: '',
      fecha_nacimiento: '',
      departamento: '',
      genero: '',
      municipio: '',
      direccion: '',
      contactos: [],
      documentos: [],
    },
  }),
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    departamentos: {
      type: Array,
      default: () => [],
    },
    generos: {
      type: Array,
      default: () => [],
    },
    contactos: {
      type: Array,
      default: () => [],
    },
    documentos: {
      type: Array,
      default: () => [],
    },
    municipios: {
      type: Array,
      default: () => [],
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    dataEdit: {
      type: Object,
      default: () => {
      },
    },
  },
  computed: {
    fechaNacimiento() {
      const { fecha_nacimiento: fechaNacimiento } = this.forms;
      if (!fechaNacimiento) {
        return '';
      }
      const momentDate = moment(fechaNacimiento);
      momentDate.locale('es-sv');
      return momentDate.format('dddd, MMMM Do YYYY');
    },
    itemsDocumentos() {
      return {
        label: 'Seleccione el tipo de documento',
        rules: [this.rules.required],
        data: this.documentos,
      };
    },
    itemsContactos() {
      return {
        label: 'Seleccione el tipo de contacto',
        rules: [this.rules.required],
        data: this.contactos,
      };
    },
  },
  methods: {
    validateForm() {
      if (!this.$refs.form.validate()) {
        this.$store.commit('utils/setAlert', {
          show: true,
          type: 'error',
          message: 'Por favor, verifique los campos marcados en rojo',
        }, { root: true });
        return;
      }
      // eslint-disable-next-line no-unused-vars
      const { departamento, ...forms } = this.forms;
      const contactos = this.$refs.tableContacto.getItems();
      const documentos = this.$refs.tableDocumento.getItems();

      forms.contactos = contactos.map(({ numero, tipo }) => ({ numero, id: tipo }));
      forms.documentos = documentos.map(({ numero, tipo }) => ({ numero, id: tipo }));
      this.$refs.form.resetValidation();
      this.$emit('closeOrSave', { type: 'save', forms });
    },
    changeDepartamento() {
      const { departamento } = this.forms;
      if (departamento) {
        this.forms.municipio = null;
        this.$emit('change-departamento', departamento);
      }
    },
  },
  created() {
    this.rules = { ...this.rulesValidations };
    if (this.isEdit) {
      const { departamento_id, municipio_id, persona, paciente } = this.dataEdit;
      const forms = {
        nombre: persona.nombre,
        municipio: municipio_id,
        apellido: persona.apellido,
        departamento: departamento_id,
        direccion: paciente.direccion,
        fecha_nacimiento: moment(paciente.fechaNacimiento).format('YYYY-MM-DD'),
      };
      this.forms = { ...forms };
      //this.forms = {...forms};
      /*this.$nextTick(() => {
        this.$refs.tableContacto.setItems(contactos);
        this.$refs.tableDocumento.setItems(documentos);
      });*/
    }
  },
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
