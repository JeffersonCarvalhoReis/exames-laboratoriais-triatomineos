<template>
  <div>
    <HeaderDrawer title="verificar exames" />
    <div class="column no-wrap">
      <div class="row q-gutter-lg q-ma-lg justify-center q-pa-lg">
        <q-select class="col-12 col-md-3" v-model="selectedYear" :options="years" label="Ano" outlined
          @update:model-value="onYearChange" />

        <!-- Seletor de Quadrimestre -->
        <q-select class="col-12 col-md-3" v-model="selectedQuarter" :options="filteredQuarters" label="Quadrimestre"
          outlined :readonly="!selectedYear" @update:model-value="onQuarterChange" />

        <!-- Seletor de Mês -->
        <q-select class="col-12 col-md-3" v-model="selectedMonth" :options="filteredMonths" label="Mês" outlined
          :readonly="!selectedQuarter" emit-value map-options />

        <!-- Botão para enviar o formulário -->
      </div>
      <q-btn class="q-px-lg q-mx-auto q-my-lg" icon="fa-solid fa-magnifying-glass" type="button" label="Buscar"
        @click="submitForm" color="primary" />
    </div>
  </div>
</template>

<script>
  import { useElementStore } from "src/stores/elementsStore";
  import HeaderDrawer from "src/components/HeaderDrawer.vue";
  import { collection, getDocs, query, where } from "firebase/firestore";
  import { db } from "src/firebaseConfig";
  export default {
    components: { HeaderDrawer },
    data() {
      return {
        // Dados disponíveis
        years: [], // Anos cadastrados

        // Seletor de ano, quadrimestre e mês
        selectedYear: null,
        selectedQuarter: null,
        selectedMonth: null,

        // Variáveis filtradas
        filteredQuarters: [],
        filteredMonths: [],

        monthNames: [
          { number: 1, name: "Janeiro" },
          { number: 2, name: "Fevereiro" },
          { number: 3, name: "Março" },
          { number: 4, name: "Abril" },
          { number: 5, name: "Maio" },
          { number: 6, name: "Junho" },
          { number: 7, name: "Julho" },
          { number: 8, name: "Agosto" },
          { number: 9, name: "Setembro" },
          { number: 10, name: "Outubro" },
          { number: 11, name: "Novembro" },
          { number: 12, name: "Dezembro" },
        ],
      };
    },
    beforeMount() {
      useElementStore().separador = false;
      useElementStore().barraVertical = true;
      useElementStore().menuExcluido = true;

    },
    async mounted() {
      await this.getYearsFromFirestore();

    },
    beforeUnmount() {
      useElementStore().barraVertical = false;
      useElementStore().separador = true;
      useElementStore().menuExcluido = false;

    },



    methods: {
      formattedDate(data) {
        const [day, month, year] = data.split("/");
        return `${year}-${month}-${day}`
      },
      async getYearsFromFirestore() {
        const examsSnapshot = await getDocs(collection(db, "exames"));
        const yearSet = new Set();

        examsSnapshot.forEach(doc => {
          const examData = doc.data();
          const examYear = new Date(this.formattedDate(examData.dataExame)).getFullYear();

          yearSet.add(examYear.toString());

        });
        this.years = Array.from(yearSet).sort((a, b) => b.localeCompare(a));
      },
      // Método chamado ao escolher um ano
      async onYearChange() {
        // Resetar quadrimestre e mês selecionados
        this.selectedQuarter = null;
        this.selectedMonth = null;
        // Limpar os meses filtrados
        this.filteredMonths = [];
        await this.getQuartersFromFiresotre();
      },

      async getQuartersFromFiresotre() {
        const examsSnapshot = await getDocs(
          query(collection(db, "exames"), where("dataExame", ">=", `${this.selectedYear}-01-01`), where("dataExame", "<=", `${this.selectedYear}-12-31`))
        );
        const quarterSet = new Set();

        examsSnapshot.forEach(doc => {
          const examData = doc.data();
          const examMonth = new Date(this.formattedDate(examData.dataExame)).getMonth() + 1;
          console.log("data: ", examData.dataExame)
          console.log("ano: ", this.selectedYear)

          const quarter = this.getQuarterFromMonth(examMonth);
          quarterSet.add(quarter)

        });

        this.filteredQuarters = Array.from(quarterSet).sort();
      },

      getQuarterFromMonth(month) {
        if (month >= 1 && month <= 4) return "1º";
        if (month >= 5 && month <= 8) return "2º";
        return "3º"
      },

      // Método chamado ao escolher um quadrimestre
      async onQuarterChange() {
        // Resetar o mês selecionado
        this.selectedMonth = null;
        await this.getMonthsFromFirestore();

      },

      async getMonthsFromFirestore() {
        const examsSnapshot = await getDocs(
          query(collection(db, "exames"), where("dataExame", ">=", `${this.selectedYear}-01-01`), where("dataExame", "<=", `${this.selectedYear}-12-31`))
        );

        const monthSet = new Set();
        examsSnapshot.forEach(doc => {
          const examData = doc.data();
          const examMonth = new Date(this.formattedDate(examData.dataExame)).getMonth() + 1;
          const quarter = this.getQuarterFromMonth(examMonth);

          if (quarter === this.selectedQuarter) {
            monthSet.add(examMonth);
          }
        });
        this.filteredMonths = Array.from(monthSet).sort().map((monthNumber) => {
          const monthObj = this.monthNames.find((m) => m.number === monthNumber);
          return { value: String(monthObj.number).padStart(2, '0'), label: monthObj.name };
        });;
      },

      // Submeter o formulário
      submitForm() {
        this.$router.push({
          path: "/gerar-resultados",
          query: {
            year: this.selectedYear,
            quarter: this.selectedQuarter,
            month: this.selectedMonth,
          },
        });
      },
    },
  };
</script>
