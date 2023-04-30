<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h3>Debe contestar si o no a cada antecedentes personal</h3>
      </v-col>
      <v-col cols="12">
        <v-checkbox
          v-model="notPoseeAntecedentes"
          label="No posee antecedentes personales para estas patologías"
        />
      </v-col>
    </v-row>
    <v-form ref="form" v-model="valid" lazy-validation @submit="handlerSubmit">
      <v-row v-if="!notPoseeAntecedentes">
        <v-col v-for="(item, index) in inputs" :key="index" :cols="item.span || 3">
          <v-radio-group
            row
            :key="item.key"
            v-model="item.value"
            :label="item.label"
            class="d-flex justify-space-between"
            @change="() => handlerChange(item)"
          >
            <v-radio :value="true" label="Si" />
            <v-radio :value="false" label="No" />
          </v-radio-group>
          <v-row v-if="item.show">
            <v-col cols="12">
              <v-select
                outlined
                :items="years"
                :rules="[(v) => !!v || 'El año es requerido']"
                v-model="item.inputs.year"
                label="Año de inicio: *"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                outlined
                v-model="item.inputs.text"
                label="Medicamento que toma: *"
                :rules="[(v) => !!v || 'Medicamento es requerido']"
              />
            </v-col>
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
const inputs = ([
  { key: 1, label: 'Hipertensión Arterial', value: false },
  { key: 2, label: 'Diabetes Mellitus', value: false },
  { key: 3, label: 'Hipertiroidismo', value: false },
  { key: 4, label: 'Hipotiroidismo', value: false },
  { key: 5, label: 'Epilepsia', value: false },
  { key: 7, label: 'Enfermedad Renal Crónica (ERC)', value: false },
  { key: 8, label: 'Colagenopatías', value: false},
  { key: 10, label: 'Hepatitis B', value: false },
  { key: 11, label: 'Hepatitis C', value: false },
  { key: 12, label: 'Obesidad', value: false },
  { key: 14, label: 'Cancer Gástrico', value: false },
  { key: 15, label: 'Cancer Colorrectal', value: false },
  { key: 16, label: 'Cancer de próstata', value: false },
  { key: 13, label: 'Infecciones de Transmisión Sexual', value: false, span: 4 },
  { key: 6, label: 'Enfermedad pulmonar obstructiva crónica (EPOC)', value: false, span: 4 },
  { key: 9, label: 'Otras enfermedades cardiovasculares (Excepto HTA)', value: false, span: 4 },
])

export default {
  name: 'AntecendesPersonales',
  data: () => ({
    inputs,
    years : [],
    valid: false,
    notPoseeAntecedentes: false,
  }),
  methods: {
    handlerSubmit(e) {
      e.preventDefault()
      if(this.$refs.form.validate()) {
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
      }
    },
    handlerChange(item) {
      item.show = item.value
      if(item.show) {
        item.inputs = {
          year: null,
          text: null,
        }
      } else {
        delete item.inputs;
      }
    }
  },
  created() {
    this.years = this.yearsSelect()
  }
}
</script>
