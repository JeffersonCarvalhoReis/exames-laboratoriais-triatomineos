<template>
  <q-header reveal elevated class="bg-primary text-white">
    <q-toolbar class="flex justify-around items-center">
      <div v-if="logado">
        <div></div>
        <q-btn
          flat
          round
          dense
          icon="menu"
          class="q-mr-sm"
          @click="$emit('toggle-drawer')"
        />
      </div>
      <q-separator dark vertical inset v-show="logado" />
      <q-space />
      <div class="text-h5 text-center text-uppercase q-mx-xs">{{ title }}</div>
      <q-space />
      <q-separator
        dark
        vertical
        inset
        class="q-mx-sm"
        v-show="exame || excluidos"
      />
      <q-btn
        flat
        round
        dense
        icon="more_vert"
        @click="openMenu"
        v-if="excluidos"
      >
        <q-menu transition-show="scale" transition-hide="scale">
          <q-list style="min-width: 100px">
            <q-item clickable to="/excluidos-exames">
              <q-item-section>Excluídos</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>

      <div v-if="exame">
        <i class="fa-solid fa-microscope fa-2xl"></i>
      </div>
    </q-toolbar>
    <!-- <q-btn color="red" @click="logout" icon="fa-solid fa-power-off" round v-if="logado" /> -->
  </q-header>
</template>

<script>
// import { getAuth, signOut } from 'firebase/auth';

export default {
  props: {
    title: {
      type: String,
      default: "exames de triatomíneos",
    },
    logado: {
      type: Boolean,
      default: true,
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

  // methods: {
  //   logout() {
  //     const auth = getAuth();
  //     signOut(auth).then(() => {
  //       this.$router.push('/login');
  //     });
  //   }
  // }
};
</script>
<style scoped>
.flex-row-nowrap {
  display: flex;
  flex-wrap: nowrap;
  /* Impede a quebra de linha */
}
</style>
