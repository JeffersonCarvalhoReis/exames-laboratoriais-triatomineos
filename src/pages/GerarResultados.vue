<template>
  <q-page class="gerar-resultados-page">
    <HeaderDrawer title="Gerar Resultados" />
    <ExameTable class="q-mt-md" :resultados="resultados" :columns="columns" />
    <q-btn
      label="Gerar Resultados"
      color="secondary"
      @click="gerarResultados"
    />

    <div class="q-mt-md">
      <div>
        De {{ formatarData(intervaloDatas.start) }} até
        {{ formatarData(intervaloDatas.end) }}
      </div>
      <div>{{ quadrimestre }}º quadrimestre de {{ anoQuadrimestre }}</div>
    </div>
  </q-page>
</template>

<script>
import HeaderDrawer from "src/components/HeaderDrawer.vue";
import ExameTable from "src/components/ExameTable.vue"; // import firebaseMixin from '../mixins/firebaseMixin';

export default {
  components: { HeaderDrawer, ExameTable },
  // mixins: [firebaseMixin],
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
        { name: "details", label: "Detalhes", align: "center" }, // Coluna para a lupa
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
        { name: "actions", label: "Exlcuir", align: "center" }, // Coluna para a lixeira
      ],
      intervaloDatas: { start: "01/01/2024", end: "04-30-2024" },
      quadrimestre: "Q1",
      anoQuadrimestre: "2024",
    };
  },
  methods: {
    async gerarResultados() {
      this.$router.push("/resultados-exames");
    },

    formatarData(data) {
      return new Date(data).toLocaleDateString("pt-BR");
    },
  },
};
</script>
