<template>
  <q-layout view="hHh lpR lff">

    <!-- Conteúdo Principal -->
    <q-page-container class="body">
      <!-- Aqui suas páginas serão injetadas -->
      <router-view />
    </q-page-container>
    <!-- Rodapé -->
    <MainFooter />
  </q-layout>
</template>

<script>
  import MainFooter from 'src/components/MainFooter.vue';
  export default {
    name: 'MainLayout',
    components: { MainFooter },

  }
</script>
<style scoped>
  .body {
    margin: 0 auto;
    max-width: 1000px;
  }
</style>
