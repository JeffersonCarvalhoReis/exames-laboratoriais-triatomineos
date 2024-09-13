<template>
  <q-header reveal elevated class="bg-primary text-white">
    <q-toolbar class="flex justify-around items-center">
      <div v-if="isLoggedIn">
        <div></div>
        <q-btn flat round dense icon="menu" class="q-mr-sm" @click="$emit('toggle-drawer')" />
      </div>
      <q-separator dark vertical inset v-if="isLoggedIn" />
      <q-space />
      <div class="text-h5 text-center text-uppercase q-mx-auto">
        {{ title }}
      </div>
      <q-space />
      <div class="canto" v-if="separador"></div>
      <q-separator dark vertical inset class="q-mx-sm" v-show="barraVertical" />
      <q-btn flat round dense icon="more_vert" @click="openMenu" v-if="menuExcluido">
        <q-menu transition-show="scale" transition-hide="scale">
          <q-list style="min-width: 100px">
            <q-item clickable to="/excluidos-exames">
              <q-item-section>Excluídos</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <div v-if="iconeExame" class="q-ml-sm">
        <i class="fa-solid fa-microscope fa-2xl"></i>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
  import { useElementStore } from "src/stores/elementsStore";
  import { getAuth } from "firebase/auth";
  export default {
    props: {
      title: {
        type: String,
        default: "exames de triatomíneos",
      },
    },
    data() {
      return {
        user: null, // Estado do usuário
        separador: useElementStore().separador,
        barraVertical: useElementStore().barraVertical,
        menuExcluido: useElementStore().menuExcluido,
        iconeExame: useElementStore().iconeExame
      };
    },

    computed: {

      // Computed para verificar se o usuário está logado
      isLoggedIn() {
        return !!this.user;
      },
    },

    methods: {
      // Método para buscar o estado do usuário
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
<style scoped>
  .canto {
    width: 30px;
  }

  .flex-row-nowrap {
    display: flex;
    flex-wrap: nowrap;
    /* Impede a quebra de linha */
  }
</style>
