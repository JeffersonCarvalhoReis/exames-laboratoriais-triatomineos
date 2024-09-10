<template>
  <q-page class="q-pa-md">

    <div class="q-table-container">
      <p>{{ message }}</p>
      <q-table :grid="$q.screen.lt.sm" bordered :rows="rows" :columns="columns" row-key="codigo_ibge" flat
        :virtual-scroll="true" dense separator="cell">
        <template v-slot:body-cell="{ row, col }">
          <q-td>{{ row[col.field] }}</q-td>
        </template>
        <template v-slot:header="">
          <q-tr :props="pros">
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
  </q-page>
</template>

<script>
  export default {
    props: {
      message: {
        type: String,
        required: true
      },
    },
    data() {
      return {

        columns: [
          { name: "codigo_ibge", field: "codigo_ibge", label: "Código IBGE" },
          { name: "municipio", field: "municipio", label: "Município" },
          { name: "grau_risco", field: "grau_risco", label: "Grau de Risco" },
          { name: "especie", field: "especie", label: "Espécie" },
          {
            name: "a_intra_capturado",
            field: "a_intra_capturado",
            label: "Intra - Capturado - Adulto",
          },
          {
            name: "n_intra_capturado",
            field: "n_intra_capturado",
            label: "Intra - Capturado - Ninfa",
          },
          {
            name: "t_intra_capturado",
            field: "t_intra_capturado",
            label: "Intra - Capturado - Total",
          },
          {
            name: "a_intra_analisado",
            field: "a_intra_analisado",
            label: "Intra - Analisado - Adulto",
          },
          {
            name: "n_intra_analisado",
            field: "n_intra_analisado",
            label: "Intra - Analisado - Ninfa",
          },
          {
            name: "t_intra_analisado",
            field: "t_intra_analisado",
            label: "Intra - Analisado - Total",
          },
          {
            name: "a_intra_positivo",
            field: "a_intra_positivo",
            label: "Intra - Positivo - Adulto",
          },
          {
            name: "n_intra_positivo",
            field: "n_intra_positivo",
            label: "Intra - Positivo - Ninfa",
          },
          {
            name: "t_intra_positivo",
            field: "t_intra_positivo",
            label: "Intra - Positivo - Total",
          },
          {
            name: "a_peri_capturado",
            field: "a_peri_capturado",
            label: "Peri - Capturado - Adulto",
          },
          {
            name: "n_peri_capturado",
            field: "n_peri_capturado",
            label: "Peri - Capturado - Ninfa",
          },
          {
            name: "t_peri_capturado",
            field: "t_peri_capturado",
            label: "Peri - Capturado",
          },
          {
            name: "a_peri_analisado",
            field: "a_peri_analisado",
            label: "Peri - Analisado - Adulto",
          },
          {
            name: "n_peri_analisado",
            field: "n_peri_analisado",
            label: "Peri - Analisado - Ninfa",
          },
          {
            name: "t_peri_analisado",
            field: "t_peri_analisado",
            label: "Peri - Analisado - Total",
          },
          {
            name: "a_peri_positivo",
            field: "a_peri_positivo",
            label: "Peri - Positivo - Adulto",
          },
          {
            name: "n_peri_positivo",
            field: "n_peri_positivo",
            label: "Peri - Positivo - Ninfa",
          },
          {
            name: "t_peri_positivo",
            field: "t_peri_positivo",
            label: "Peri - Positivo - Total",
          },
        ],
        rows: [
          {
            codigo_ibge: "2915353",
            municipio: "Itaguaçu da Bahia",
            grau_risco: "ALTO",
            especie: 2,
            a_intra_capturado: 10,
            n_intra_capturado: 10,
            t_intra_capturado: 20,
            n_intra_analisado: 4,
            a_intra_analisado: 0,
            t_intra_analisado: 0,
            a_intra_positivo: 0,
            n_intra_positivo: 0,
            t_intra_positivo: 0,

            a_peri_capturado: 9,
            n_peri_capturado: 0,
            t_peri_capturado: 9,
            a_peri_analisado: 2,
            n_peri_analisado: 0,
            t_peri_analisado: 2,
            a_peri_positivo: 0,
            n_peri_positivo: 0,
            t_peri_positivo: 0,
          },
          {
            codigo_ibge: "2915353",
            municipio: "Itaguaçu da Bahia",
            grau_risco: "ALTO",
            especie: 3,
            a_intra_capturado: 10,
            n_intra_capturado: 10,
            t_intra_capturado: 20,
            n_intra_analisado: 4,
            a_intra_analisado: 0,
            t_intra_analisado: 0,
            a_intra_positivo: 0,
            n_intra_positivo: 0,
            t_intra_positivo: 0,

            a_peri_capturado: 9,
            n_peri_capturado: 0,
            t_peri_capturado: 9,
            a_peri_analisado: 2,
            n_peri_analisado: 0,
            t_peri_analisado: 2,
            a_peri_positivo: 0,
            n_peri_positivo: 0,
            t_peri_positivo: 0,
          },
          {
            codigo_ibge: "2915353",
            municipio: "Itaguaçu da Bahia",
            grau_risco: "ALTO",
            especie: 4,
            a_intra_capturado: 10,
            n_intra_capturado: 10,
            t_intra_capturado: 20,
            n_intra_analisado: 4,
            a_intra_analisado: 0,
            t_intra_analisado: 0,
            a_intra_positivo: 0,
            n_intra_positivo: 0,
            t_intra_positivo: 0,

            a_peri_capturado: 9,
            n_peri_capturado: 0,
            t_peri_capturado: 9,
            a_peri_analisado: 2,
            n_peri_analisado: 0,
            t_peri_analisado: 2,
            a_peri_positivo: 0,
            n_peri_positivo: 0,
            t_peri_positivo: 0,
          },
          {
            codigo_ibge: "2915353",
            municipio: "Itaguaçu da Bahia",
            grau_risco: "ALTO",
            especie: 20,
            a_intra_capturado: 10,
            n_intra_capturado: 10,
            t_intra_capturado: 20,
            n_intra_analisado: 4,
            a_intra_analisado: 0,
            t_intra_analisado: 0,
            a_intra_positivo: 0,
            n_intra_positivo: 0,
            t_intra_positivo: 0,

            a_peri_capturado: 9,
            n_peri_capturado: 0,
            t_peri_capturado: 9,
            a_peri_analisado: 2,
            n_peri_analisado: 0,
            t_peri_analisado: 2,
            a_peri_positivo: 0,
            n_peri_positivo: 0,
            t_peri_positivo: 0,
          },
          {
            codigo_ibge: "2915353",
            municipio: "Itaguaçu da Bahia",
            grau_risco: "ALTO",
            especie: 23,
            a_intra_capturado: 10,
            n_intra_capturado: 10,
            t_intra_capturado: 20,
            n_intra_analisado: 4,
            a_intra_analisado: 0,
            t_intra_analisado: 0,
            a_intra_positivo: 0,
            n_intra_positivo: 0,
            t_intra_positivo: 0,

            a_peri_capturado: 9,
            n_peri_capturado: 0,
            t_peri_capturado: 9,
            a_peri_analisado: 2,
            n_peri_analisado: 0,
            t_peri_analisado: 2,
            a_peri_positivo: 0,
            n_peri_positivo: 0,
            t_peri_positivo: 0,
          },
        ],
      };
    },
  };
</script>
<style scoped>
  .q-tabel-container {
    max-width: 100%;
    overflow-x: auto;
  }
</style>
