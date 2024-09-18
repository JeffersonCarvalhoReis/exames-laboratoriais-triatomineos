<template>
  <MainHeader @toggle-drawer="toggleLeftDrawer" :title="title" :exame="exame" :excluidos="excluidos" />
  <div v-if="isLoggedIn">
    <MenuDrawer :drawer="leftDrawerOpen" @update:drawer="leftDrawerOpen = $event" />
  </div>
</template>

<script>
  import MainHeader from "./MainHeader.vue";
  import MenuDrawer from "./MenuDrawer.vue";
  import { getAuth } from "firebase/auth";

  export default {
    components: { MainHeader, MenuDrawer },
    props: {
      title: {
        type: String,
      },
      exame: {
        type: Boolean,
        default: false,
      },
      excluidos: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        leftDrawerOpen: false,
        user: null, // Estado do usuário

      };
    },
    computed: {

      // Computed para verificar se o usuário está logado
      isLoggedIn() {
        return !!this.user;
      },
    },
    methods: {
      toggleLeftDrawer() {
        this.leftDrawerOpen = !this.leftDrawerOpen;
      },
      checkAuthState() {
        const auth = getAuth();
        this.user = auth.currentUser; // Atualiza o estado local com o valor da store
      },

    },
    mounted() {
      // Simula o delay inicial para carregar o estado de autenticação
      this.checkAuthState();
    },
  };
</script>

<style></style>
