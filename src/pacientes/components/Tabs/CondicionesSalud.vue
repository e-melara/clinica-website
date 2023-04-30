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
              <v-textarea
                outlined
                rows="3"
                label="Especifique: *"
                v-model="item.description"
                :rules="[(v) => !!v || 'Descripcion requerida']"
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
  { key: 1, label: 'Reacciones adversas a medicamentos', value: false, span: 4 },
  { key: 2, label: 'Cirugias Realizadas', value: false, span: 3 },
  { key: 3, label: 'Alergias', value: false, span:2},
  { key: 3, label: 'Tiene alguna discapacidad?', value: false, span: 3 },
])

export default {
  name: 'CondicionSalud',
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
        item.description = null;
      } else {
        delete item.description;
      }
    }
  },
  created() {
    this.years = this.yearsSelect()
  }
}
</script>
