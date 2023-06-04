<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h3>Debe contestar si o no a cada patologia familiar</h3>
      </v-col>
      <v-col cols="12">
        <v-checkbox
          v-model="notPoseeAntecedentes"
          label="No posee familiares con antecedentes para estas patologías"
        />
      </v-col>
    </v-row>
    <v-form ref="form" v-model="valid" lazy-validation @submit="handlerSubmit">
      <v-row v-if="!notPoseeAntecedentes">
        <v-col
          class="d-flex justify-end"
          v-for="(item, index) in step.preguntas"
          :key="index"
          :cols="item.span || 6"
        >
          <v-radio-group
            v-model="item.valor"
            :key="item.id"
            row
            :label="item.nombrePregunta"
            class="d-flex justify-space-between"
          >
            <v-radio value="1" label="Si" />
            <v-radio value="2" label="No" />
          </v-radio-group>
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
import { mapState } from 'vuex'

export default {
  name: 'AntecendesFamiliares',
  data: () => ({
    valid: false,
    notPoseeAntecedentes: false,
  }),
  methods: {
    handlerSubmit(e) {
      e.preventDefault()
      let response = [];
      if(!this.notPoseeAntecedentes) {
        let validateOnly = this.step.preguntas.filter(({valor}) => valor === '1')
        if(validateOnly.length === 0 ) {
          this.$store.commit('utils/setAlert', {
            show: true,
            type: 'error',
            message: 'Debe seleccionar por lo menos una opción, sino seleccione que "No posee antecedentes"',
          })
          return;
        }
        response = validateOnly.map(({id, codigo}) => ({id, codigo}))
      } else {
        response = [{ id: '27', codigo: 'P27' }]
      }
      this.$emit('save', { data: response, step: this.step.id })
    },
  },
  computed:{
    ...mapState('pacient', ['step']),
  },
}
</script>
