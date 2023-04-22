<template>
  <v-card class="my-8">
    <v-card-title class="text-h5">{{ title.toUpperCase() }}</v-card-title>
    <v-card-text class="text-h5">
      <v-form ref="form" lazy-validation v-model="valid">
        <v-container>
          <v-row>
            <v-col cols="12" md="5">
              <v-select
                outlined
                filled
                v-model="tipo"
                :items="items.data"
                :rules="items.rules"
                :label="items.label"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="5">
              <v-text-field
                v-model="numero"
                filled
                :label="txtLabelOptions.label"
                required
                outlined
                :rules="txtLabelOptions.rules"
              />
            </v-col>

            <v-col cols="12" md="2">
              <v-btn
                block
                :disabled="!valid"
                color="primary"
                class="mr-4"
                @click="validate"
                height="50"
              >
                Agregar
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
    <v-simple-table class="elevation-1">
      <template v-slot:default>
        <thead class="v-data-table-header">
          <tr>
            <th class="text-left">Tipo</th>
            <th class="text-left">Numero</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody v-if="list.length > 0">
          <tr v-for="item in list" :key="item.id">
            <td>{{ item.tipo }}</td>
            <td>{{ item.numero }}</td>
            <td style="width: 80px" class="text-center">
              <v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
            </td>
          </tr>
        </tbody>
        <tfoot v-else>
          <tr>
            <th colspan="3">
              <h3 class="text-center">Por el momento no tiene datos que mostrar</h3>
            </th>
          </tr>
        </tfoot>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script lang="js">
export default {
  data: () => ({
    valid: false,
    tipo: '',
    numero: '',
    list: [],
  }),
  props: {
    items: {
      type: Object,
      default: () => {},
      required: true,
    },
    txtLabelOptions: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: 'Title component'
    }
  },
  methods: {
    validate() {
      if(!this.$refs.form.validate()) {
        return;
      }
      this.list.push({
        id: Math.random() * new Date().getTime(),
        tipo: this.tipo,
        numero: this.numero
      });
      this.$refs.form.reset();
    },
    deleteItem({ id }) {
      this.list = this.list.filter(item => id !== item.id);
    },
    getItems() {
      return this.list;
    }
  }
}
</script>

<style></style>
