<template>
  <q-page class="home-page">
    <HeaderDrawer />
    <!-- Implement the home page content here -->
    <div class="q-pa-md row justify-center q-gutter-md">
      <q-btn icon="fa-solid fa-file-alt" label="NOVO EXAME" class="col-12 col-md-5" color="primary" @click="novoExame"
        style="height: 150px; font-size: 20px;" />

      <q-btn icon="fa-solid fa-magnifying-glass" label="VERIFICAR EXAMES" class="col-12 col-md-5" color="secondary"
        @click="verificarExames" style="height: 150px; font-size: 20px;" />
      <img class="barbeiro q-mt-md" src="../assets/icon-background.png" alt="Imagem de fundo">

    </div>
  </q-page>
</template>

<script>
  import HeaderDrawer from 'src/components/HeaderDrawer.vue';
  export default {
    components: { HeaderDrawer },
    methods: {
      async logout() {
        const auth = getAuth();
        await signOut(auth);
        this.$router.push('/login');
      },
      novoExame() {
        // Aqui você pode redirecionar para a página de criação de novo exame
        this.$router.push('/novo-exame');
      },
      verificarExames() {
        // Aqui você pode redirecionar para a página de verificação de exames
        this.$router.push('/verificar-exames');
      },
    },
  };
</script>

<style scoped>
  .barbeiro {
    width: 40%;
    min-width: 350px;
  }

  .q-page {
    min-height: 10px !important;
    margin: 10vh 1vh;
    /* Ajusta para não sobrepor o conteúdo ao cabeçalho */
  }
</style>
