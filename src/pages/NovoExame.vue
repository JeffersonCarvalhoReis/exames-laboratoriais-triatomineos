<template>
  <q-page class="novo-exame-page">
    <HeaderDrawer title="Novo Exame" :exame="true" />

    <ExameForm @submit="onSubmit" />
  </q-page>
</template>

<script>
import HeaderDrawer from "src/components/HeaderDrawer.vue";
import ExameForm from "../components/ExameForm.vue";

export default {
  components: { ExameForm, HeaderDrawer },
  methods: {
    onSubmit(exameData) {
      // Logic to handle form submission
    },
  },
};
</script>
