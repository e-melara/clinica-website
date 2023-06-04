<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h3>Debe contestar Si o No a cada condición de salud</h3>
      </v-col>
      <v-col cols="12">
        <v-checkbox
          v-model="notPoseeAntecedentes"
          label="No posee ninguna condición de salud especial"
        />
      </v-col>
    </v-row>
    <v-form ref="form" v-model="valid" lazy-validation @submit="handlerSubmit">
      <v-row v-if="!notPoseeAntecedentes">
        <v-col v-for="(item, index) in step.preguntas" :key="index" :cols="item.span || 6">
          <v-row>
            <v-col cols="12" class="d-flex justify-end">
              <v-radio-group
                row
                :key="item.id"
                v-model="item.valor"
                :label="item.nombrePregunta"
                @change="() => handlerChange(item)"
              >
                <v-radio value="1" label="Si" />
                <v-radio value="2" label="No" />
              </v-radio-group>
            </v-col>
            <v-row v-if="item.show" class="d-flex justify-end">
              <v-col cols="10">
                <v-textarea
                  outlined
                  rows="3"
                  label="Especifique: *"
                  v-model="item.inputs.description"
                  :rules="[(v) => !!v || 'Descripcion requerida']"
                />
              </v-col>
            </v-row>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="justify-end d-flex" style="border-top: 1px solid #e9e9e9">
          <v-btn class="mr-4" type="submit" color="primary" :disabled="!valid"> Guardar </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="js">
import { mapState } from 'vuex';

export default {
  name: 'CondicionSalud',
  data: () => ({
    valid: false,
    notPoseeAntecedentes: false,
  }),
  methods: {
    handlerSubmit(e) {
      e.preventDefault()
      let response = []
      if(this.$refs.form.validate()) {
        if(!this.notPoseeAntecedentes) {
          let validateOnly = this.step.preguntas.filter(({ show }) => show);
          if(!validateOnly) {
            this.$store.commit('utils/setAlert', {
              show: true,
              type: 'error',
              message: 'Debe seleccionar por lo menos una opción, sino seleccione que "No posee antecedentes"',
            })
            return;
          }
          response = validateOnly.map(({codigo, id, inputs}) => ({ id, codigo, inputs }))
        } else {
          response = [{ id: 27, codigo: 'P27' }]
        }
        this.$emit('save', { data: response, step: this.step.id })
      }
    },
    handlerChange(item) {
      item.show = !item.show
      if(item.show) {
        item.inputs = {
          description: null
        }
      } else {
        delete item.inputs;
      }
    }
  },
  computed:{
    ...mapState('pacient', ['step']),
  },
}
</script>
