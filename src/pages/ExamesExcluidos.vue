<template>
  <HeaderDrawer />
  <ExameTableExcluidos
    class="q-mt-md"
    :resultados="resultados"
    :columns="columns"
  />
</template>
<script>
import HeaderDrawer from "src/components/HeaderDrawer.vue";
import ExameTableExcluidos from "src/components/ExameTableExcluidos.vue";
export default {
  components: { HeaderDrawer, ExameTableExcluidos },
  data() {
    return {
      resultados: [
        {
          dataExame: "03-25-2024",
          responsavel: "Jefferson",
        },
        {
          dataExame: "03-25-2024",
          responsavel: "Jefferson",
        },
        {
          dataExame: "04-25-2024",
          responsavel: "Jefferson",
        },
        {
          dataExame: "05-25-2024",
          responsavel: "Jefferson",
        },
      ],
      columns: [
        {
          name: "dataExame",
          label: "Data do Exame",
          field: "dataExame",
          align: "center",
          format: (val) => this.formatarData(val),
        },
        {
          name: "responsavel",
          label: "Responsável",
          field: "responsavel",
          align: "center",
        },
        { name: "actions", label: "Restaurar", align: "center" }, // Coluna para a lixeira
      ],
    };
  },
  methods: {
    formatarData(data) {
      return new Date(data).toLocaleDateString("pt-BR");
    },
  },
};
</script>
