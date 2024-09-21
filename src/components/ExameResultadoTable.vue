<template>
  <div class="q-table-container q-m-lg">
    <p class="q-mx-md">{{ message }}</p>
    <q-table bordered :rows="resultados" :columns="columns" row-key="codigo_ibge" flat :virtual-scroll="true" dense
      separator="cell" :rows-per-page-options="[0]" class="zebra-table">
      <template v-slot:body-cell="{ row, col, rowIndex }">
        <q-td :class="{ 'odd-row': rowIndex % 2 === 0, 'even-row': rowIndex % 2 !== 0 }">
          {{ row[col.field] }}
        </q-td> </template>
      <template v-slot:header="">
        <q-tr :props="prop">
          <q-th rowspan="4">Cód. IBGE</q-th>
          <q-th rowspan="4">Município</q-th>
          <q-th rowspan="4">GRAU <br />DE <br />RISCO</q-th>
          <q-th rowspan="4" wrap-cells>Espécie <br>de <br>triatomíneo</q-th>
          <q-th colspan="18">Triatomíneos</q-th>
        </q-tr>
        <q-tr>
          <q-th colspan="9">Intra</q-th>
          <q-th colspan="9">Peri</q-th>
        </q-tr>
        <q-tr>
          <q-th colspan="3">Capturados</q-th>
          <q-th colspan="3">Analisados</q-th>
          <q-th colspan="3">Positivos</q-th>
          <q-th colspan="3">Capturados</q-th>
          <q-th colspan="3">Analisados</q-th>
          <q-th colspan="3">Positivos</q-th>
        </q-tr>
        <q-tr>
          <q-th>A</q-th>
          <q-th>N</q-th>
          <q-th>T</q-th>
          <q-th>A</q-th>
          <q-th>N</q-th>
          <q-th>T</q-th>
          <q-th>A</q-th>
          <q-th>N</q-th>
          <q-th>T</q-th>
          <q-th>A</q-th>
          <q-th>N</q-th>
          <q-th>T</q-th>
          <q-th>A</q-th>
          <q-th>N</q-th>
          <q-th>T</q-th>
          <q-th>A</q-th>
          <q-th>N</q-th>
          <q-th>T</q-th>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
  export default {
    props: {
      message: {
        type: String,
        required: true
      },
      resultados: Array,
      columns: Array,
    },

  };
</script>
<style scoped>
  .q-tabel-container {
    max-width: 100%;
    overflow-x: auto;
  }

  .odd-row {
    background-color: #f5f5f5;
  }

  .even-row {
    background-color: #fff;
  }

</style>
