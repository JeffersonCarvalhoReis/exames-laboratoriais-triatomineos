<template>
  <q-table :rows="resultados" :columns="columns" row-key="dataExame" dense>
    <!-- Coluna da lixeira para excluir a linha -->
    <template v-slot:body-cell-actions="props">
      <q-td align="center">
        <q-btn
          icon="restore"
          color="positive"
          flat
          @click="restaurarExame(props.row)"
        />
      </q-td>
    </template>
  </q-table>
</template>

<script>
export default {
  props: {
    resultados: Array,
    columns: Array,
  },
  methods: {
    restaurarExame(id) {
      this.$emit("restaurar", id);
    },
  },
};
</script>
