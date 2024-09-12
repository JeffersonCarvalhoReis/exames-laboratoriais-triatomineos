<template>
  <q-page class="novo-exame-page">
    <HeaderDrawer title="Novo Exame" :exame="true" />

    <ExameForm @submit="onSubmit" />
  </q-page>
</template>

<script>
import { useElementStore } from "src/stores/elementsStore";
import HeaderDrawer from "src/components/HeaderDrawer.vue";
import ExameForm from "../components/ExameForm.vue";

export default {
  components: { ExameForm, HeaderDrawer },
  methods: {
    onSubmit(exameData) {
      // Logic to handle form submission
    },
  },
  beforeMount() {
    useElementStore().atualizaSeparador(false);
    useElementStore().barraVertical = true;
  },
  beforeUnmount() {
    useElementStore().barraVertical = false;
    useElementStore().atualizaSeparador(true);
  },
};
</script>
