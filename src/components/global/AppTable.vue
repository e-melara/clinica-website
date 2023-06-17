<template>
  <v-data-table
    :calculate-widths="true"
    :items-per-page="5"
    :headers="getHeaders"
    :items="data"
    item-key="npe"
    :server-items-length="total"
    :loading="loading"
    @update:options="updateOptions"
    item-class="table-row"
    :hide-default-header="hideDefaultHeader"
    loading-text="Cargando... por favor espere"
    no-results-text="No se encontraron resultados"
    no-data-text="No se encontraron resultados"
    :footer-props="{
      showFirstLastPages: true,
      'items-per-page-options': [5, 10, 15],
      'items-per-page-text': 'Número de registros',
    }"
    :hide-default-footer="footerDisabled"
  >
    <template v-slot:[`item.options`]="{ item }">
      <slot name="options" :item="item" />
    </template>

    <template v-for="{ value } in getHeadersCreator" v-slot:[`item.${value}`]="{ item }">
      <slot :name="value" :item="item">
        {{ item[value] }}
      </slot>
    </template>

    <!--  Slot top  -->
    <template v-slot:top>
      <slot name="top" />
    </template>
    <template v-slot:foot>
      <slot name="footer" />
    </template>

    <!-- Slot para editar casillas -->
    <!-- <template v-for="v in tipoSlotEdit" #[item.${v}]="props">
      <slot :name="v" :props="props"></slot>
    </template> -->
  </v-data-table>
</template>

<script>
export default {
  name: 'AppTable',
  props: {
    headers: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
    keyItem: {
      type: String,
      required: true,
    },
    titleOptions: {
      type: String,
      default: '',
    },
    hideDefaultHeader: {
      type: Boolean,
      default: false,
    },
    viewOptions: {
      type: Boolean,
      default: true,
    },
    tipoSlotEdit: {
      type: Array,
    },
    footerDisabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    updateOptions(options) {
      this.$emit('update:options', options);
    },
  },
  computed: {
    getHeaders() {
      const titleOptions = this.titleOptions;
      if (this.viewOptions) {
        return [
          ...this.headers,
          {
            text: titleOptions,
            value: 'options',
            sortable: false,
            align: 'right',
          },
        ];
      }
      return this.headers;
    },
    getHeadersCreator() {
      return this.headers.filter((header) => header.field === 'CREATOR');
    },
  },
};
</script>

<style>
thead.v-data-table-header tr th {
  background-color: #f5f5f5;
  border-top: thin solid rgba(0, 0, 0, 0.12);
}
</style>
