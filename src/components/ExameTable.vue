<template>
  <q-table :rows="resultados" :columns="columns" row-key="dataExame">
    <!-- Coluna da lupa para visualizar mais detalhes -->
    <template v-slot:body-cell-details="props">
      <q-td>
        <q-btn icon="search" color="primary" flat @click="viewDetails(props.row)" />
      </q-td>
    </template>

    <!-- Coluna da lixeira para excluir a linha -->
    <template v-slot:body-cell-actions="props">
      <q-td>
        <q-btn icon="delete" color="red" flat @click="deleteRow(props.row)" />
      </q-td>
    </template>
  </q-table>

</template>

<script>
  export default {
    props: {
      resultados: Array,
      columns: Array
    },
    methods: {
      visualizarExame(id) {
        this.$router.push(`/exame/${id}`);
      },
      excluirExame(id) {
        this.$emit('excluir', id);
      }
    }
  };
</script>
