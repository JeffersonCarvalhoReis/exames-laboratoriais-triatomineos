<template>
  <q-page>
    <HeaderDrawer title="Detalhes do exame" />
    <ExameDetalhes />
  </q-page>
</template>

<script>
import ExameDetalhes from "src/components/ExameDetalhes.vue";
import HeaderDrawer from "src/components/HeaderDrawer.vue";
export default {
  components: { HeaderDrawer, ExameDetalhes },
};
</script>

<style></style>
