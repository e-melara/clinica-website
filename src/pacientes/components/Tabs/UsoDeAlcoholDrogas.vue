<template>
  <v-container fluid>
    <v-form ref="form" v-model="valid" lazy-validation @submit="handlerSubmit">
      <v-row v-if="!notPoseeAntecedentes">
        <v-col v-for="(item, index) in inputs" :key="index" :cols="item.span || 3">
          <v-radio-group
            row
            :key="item.key"
            v-model="item.value"
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
  { key: 1, label: 'Etilista', value: false },
  { key: 2, label: 'Tabaquita', value: false },
  { key: 3, label: 'Drogadicción', value: false },
  { key: 4, label: 'Otros', value: false },
])

export default {
  name: 'UsoDeAlcoholDrogas',
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
    }
  },
  created() {
    this.years = this.yearsSelect()
  }
}
</script>
