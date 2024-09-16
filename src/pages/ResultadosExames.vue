<template>
  <q-page>
    <HeaderDrawer title="resultados" />
    <ExameResultadoTable
      message="Identificação e detecção da infecção natural de triatomíneos quadrimestral (por vigilância ativa -  aplicada pelo SUS)" />
    <q-separator />
    <ExameResultadoTable
      message="Identificação e detecção da infecção natural de triatomíneos quadrimestral (por vigilância passiva – vigilância popular)" />
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
