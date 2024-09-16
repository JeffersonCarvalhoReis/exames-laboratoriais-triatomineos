<template>
  <q-page class="gerar-resultados-page">
    <HeaderDrawer title="Gerar Resultados" />
    <div
      v-for="(exames, key) in quadrimestresOrdenados"
      :key="key"
      class="q-mb-md"
    >
      <p class="text-h6 text-uppercase q-mt-md">{{ exames.key }}</p>
      <div>
        De {{ formatarData(exames.menorData) }} até
        {{ formatarData(exames.maiorData) }}
      </div>
      <ExameTable
        class="q-mt-md"
        :resultados="exames.resultados"
        :columns="columns"
        :buscarResultados="buscarResultados"
      />
      <q-btn
        label="Gerar Resultados"
        color="secondary"
        @click="gerarResultados"
      />
      <q-separator class="q-mt-md" v-if="quadrimestresOrdenados.length > 1" />
      <div class="q-mt-md"></div>
    </div>
    <ExameTable
      class="q-mt-md"
      :resultados="resultadosPorQuadrimestre"
      :columns="columns"
      :buscarResultados="buscarResultados"
      v-if="semResultado"
    />
  </q-page>
</template>

<script>
import { collection, getDocs, query, where } from "firebase/firestore"; // Firebase Firestore imports
import { db } from "src/firebaseConfig";
import HeaderDrawer from "src/components/HeaderDrawer.vue";
import ExameTable from "src/components/ExameTable.vue";

export default {
  components: { HeaderDrawer, ExameTable },
  data() {
    return {
      semResultado: true,
      resultadosPorQuadrimestre: [], // Aqui será preenchido com dados reais
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
        { name: "actions", label: "Excluir", align: "center" }, // Coluna para a lixeira
      ],
      intervaloDatas: { start: "", end: "" },
      quadrimestre: "",
      anoQuadrimestre: "",
      menorData: "",
      maiorData: "",
    };
  },

  async mounted() {
    await this.buscarResultados();
  },

  computed: {
    // Computed property para ordenar os quadrimestres
    quadrimestresOrdenados() {
      return Object.keys(this.resultadosPorQuadrimestre)
        .sort((a, b) => {
          const ultimoResultadoA = new Date(
            this.resultadosPorQuadrimestre[a].maiorData
          );
          const ultimoResultadoB = new Date(
            this.resultadosPorQuadrimestre[b].maiorData
          );
          return ultimoResultadoB - ultimoResultadoA; // Ordenar em ordem decrescente
        })
        .map((key) => ({
          key,
          ...this.resultadosPorQuadrimestre[key],
        }));
    },
  },

  methods: {
    getQuarterFromDate(date) {
      const month = date.getMonth() + 1; // Months are 0-based
      if (month >= 1 && month <= 4) return "1º";
      if (month >= 5 && month <= 8) return "2º";
      if (month >= 9 && month <= 12) return "3º";
      return "";
    },
    getQuarterFromMonth(month) {
      if (month >= 1 && month <= 4) return "1º";
      if (month >= 5 && month <= 8) return "2º";
      return "3º";
    },
    getLastDayOfMonth(year, month) {
      return new Date(year, month, 0).getDate();
    },
    // Buscar os resultados com base nos parâmetros enviados via query
    async buscarResultados() {
      const year = this.$route.query.year;
      const month = this.$route.query.month;

      this.anoQuadrimestre = year;
      if (month) {
        this.quadrimestre = this.getQuarterFromMonth(month);
      } else {
        this.quadrimestre = this.$route.query.quarter;
      }

      let start, end;

      // Definir o intervalo de datas com base no quadrimestre selecionado
      if (month) {
        start = `${year}-${month}-01`;
        const lastDayOfMonth = this.getLastDayOfMonth(year, month); // Pegando o último dia do mês
        end = `${year}-${month}-${lastDayOfMonth}`; // Inclui o horário para capturar o último dia
      } else if (this.quadrimestre === "1º") {
        start = `${year}-01-01`;
        end = `${year}-04-30`;
      } else if (this.quadrimestre === "2º") {
        start = `${year}-05-01`;
        end = `${year}-08-31`;
      } else if (this.quadrimestre === "3º") {
        start = `${year}-09-01`;
        end = `${year}-12-31`;
      } else {
        start = `${year}-01-01`;
        end = `${year}-12-31`;
      }

      this.intervaloDatas = { start, end };

      // Consulta no Firestore com base no intervalo de datas
      let q;

      if (year) {
        q = query(
          collection(db, "exames"),
          where("dataExame", ">=", start),
          where("dataExame", "<=", end),
          where("deleted", "==", false)
        );
      } else {
        q = query(collection(db, "exames"), where("deleted", "==", false));
      }

      const querySnapshot = await getDocs(q);

      let resultadosPorQuadrimestre = {};

      querySnapshot.forEach((doc) => {
        const data = new Date(doc.data().dataExame); // Ajuste conforme o nome do campo
        const quadrimestre = this.getQuarterFromDate(data);
        const ano = data.getFullYear();
        const key = `${quadrimestre} quadrimestre de ${ano}`;
        this.semResultado = false;

        if (!resultadosPorQuadrimestre[key]) {
          resultadosPorQuadrimestre[key] = { resultados: [] };
        }

        resultadosPorQuadrimestre[key].resultados.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      for (const quadrimestre in resultadosPorQuadrimestre) {
        let resultados = resultadosPorQuadrimestre[quadrimestre].resultados;

        if (resultados.length > 0) {
          resultados = resultados.sort(
            (b, a) => new Date(a.dataExame) - new Date(b.dataExame)
          );

          const datas = resultados.map(
            (resultado) => new Date(resultado.dataExame)
          );
          const menorData = new Date(Math.min(...datas));
          const maiorData = new Date(Math.max(...datas));
          // Ajustar as horas para o horário local (ou ajuste que você precisa)
          menorData.setHours(menorData.getHours() + 3);
          maiorData.setHours(maiorData.getHours() + 3);

          // Atribuir as datas ajustadas
          resultadosPorQuadrimestre[quadrimestre].resultados = resultados; // Atualiza com os resultados ordenados
          resultadosPorQuadrimestre[quadrimestre].menorData = menorData
            .toISOString()
            .split("T")[0];
          resultadosPorQuadrimestre[quadrimestre].maiorData = maiorData
            .toISOString()
            .split("T")[0];
        }
      }

      // Preencher os resultados com dados reais
      this.resultadosPorQuadrimestre = resultadosPorQuadrimestre;
    },

    gerarResultados() {
      this.$router.push("/resultados-exames");
    },

    formatarData(data) {
      const [year, month, day] = data.split("-");
      return `${day}/${month}/${year}`;
    },
  },
};
</script>
