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
      <q-separator dark vertical inset />
      <q-space />
      <div class="text-h5 text-center text-uppercase q-mx-xs">{{ title }}</div>
      <q-space />
      <q-separator dark vertical inset class="q-mx-md" />
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
