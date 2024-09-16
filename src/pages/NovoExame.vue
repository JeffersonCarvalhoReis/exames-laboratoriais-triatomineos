<template>
  <q-page class="novo-exame-page">
    <HeaderDrawer title="Novo Exame" />
    <ExameForm />
  </q-page>
</template>

<script>
import { useElementStore } from "src/stores/elementsStore";
import HeaderDrawer from "src/components/HeaderDrawer.vue";
import ExameForm from "../components/ExameForm.vue";

export default {
  components: { ExameForm, HeaderDrawer },

  beforeMount() {
    useElementStore().separador = false;
    useElementStore().barraVertical = true;
    useElementStore().iconeExame = true;
  },
  beforeUnmount() {
    useElementStore().barraVertical = false;
    useElementStore().separador = true;
    useElementStore().iconeExame = false;
  },
};
</script>
