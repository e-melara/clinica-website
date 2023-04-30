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
        <v-col v-for="(item, index) in inputs" :key="index" :cols="item.span || 3">
          <v-radio-group
            v-model="item.value"
            :key="item.key"
            row
            :label="item.label"
            class="d-flex justify-space-between"
          >
            <v-radio :value="true" label="Si" />
            <v-radio :value="false" label="No" />
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
const inputs = ([
  { key: 1, label: 'Hipertensión Arterial', value: false },
  { key: 2, label: 'Diabetes Mellitus', value: false },
  { key: 3, label: 'Asma bronquial', value: false },
  { key: 10, label: 'Cancer de próstata', value: false },
  { key: 4, label: 'Trastornos mentales y de comportamiento', value: false, span: 4 },
  { key: 5, label: 'Enfermedad pulmonar obstructiva crónica (EPOC)', value: false, span: 4 },
  { key: 6, label: 'Enfermedad Renal Crónica (ERC)', value: false, span: 4 },
  { key: 7, label: 'Otras enfermedades cardiovasculares (Excepto HTA)', value: false, span: 6},
  { key: 8, label: 'Cancer Gástrico', value: false },
  { key: 9, label: 'Cancer Colorrectal', value: false },
])
export default {
  name: 'AntecendesFamiliares',
  data: () => ({
    inputs,
    valid: false,
    notPoseeAntecedentes: false,
  }),
  methods: {
    handlerSubmit(e) {
      e.preventDefault()
      if(!this.notPoseeAntecedentes) {
        let validateOnly = this.inputs.some((item) => item.value)
        if(!validateOnly) {
          this.$store.commit('utils/setAlert', {
            show: true,
            type: 'error',
            message: 'Debe seleccionar por lo menos una opción, sino seleccione que "No posee antecedentes"',
          })
          return;
        }
        console.log(this.inputs)
      }
    },
  }
}
</script>
