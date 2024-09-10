<template>
  <q-page>
    <HeaderDrawer title="resultados" />
    <ExameResultadoTable />
    <h1>teste 1</h1>
  </q-page>
</template>

<script>
  import ExameResultadoTable from 'src/components/ExameResultadoTable.vue';
  import HeaderDrawer from 'src/components/HeaderDrawer.vue';
  export default {
    components: { HeaderDrawer, ExameResultadoTable }
  }

</script>

<style></style>
