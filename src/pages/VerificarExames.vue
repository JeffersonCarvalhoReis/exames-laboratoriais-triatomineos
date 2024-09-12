<template>
  <div>
    <HeaderDrawer title="verificar exames" :excluidos="true" />
    <div class="column no-wrap">
      <div class="row q-gutter-lg q-ma-lg justify-center q-pa-lg">
        <q-select
          class="col-12 col-md-3"
          v-model="selectedYear"
          :options="years"
          label="Ano"
          outlined
          @update:model-value="onYearChange"
        />

        <!-- Seletor de Quadrimestre -->
        <q-select
          class="col-12 col-md-3"
          v-model="selectedQuarter"
          :options="filteredQuarters"
          label="Quadrimestre"
          outlined
          :readonly="!selectedYear"
          @update:model-value="onQuarterChange"
        />

        <!-- Seletor de Mês -->
        <q-select
          class="col-12 col-md-3"
          v-model="selectedMonth"
          :options="filteredMonths"
          label="Mês"
          outlined
          :readonly="!selectedQuarter"
        />

        <!-- Botão para enviar o formulário -->
      </div>
      <q-btn
        class="q-px-lg q-mx-auto q-my-lg"
        icon="fa-solid fa-magnifying-glass"
        type="button"
        label="Buscar"
        @click="submitForm"
        color="primary"
      />
    </div>
  </div>
</template>

<script>
import { useElementStore } from "src/stores/elementsStore";
import HeaderDrawer from "src/components/HeaderDrawer.vue";
export default {
  components: { HeaderDrawer },
  data() {
    return {
      // Dados disponíveis
      years: ["2022", "2023", "2024"], // Anos cadastrados

      // Estrutura de quadrimestres e meses
      data: {
        2022: {
          Q1: ["Janeiro", "Fevereiro", "Março"],
          Q2: ["Abril", "Maio", "Junho"],
          Q3: ["Julho", "Agosto", "Setembro"],
          Q4: ["Outubro", "Novembro", "Dezembro"],
        },
        2023: {
          Q1: ["Janeiro", "Fevereiro", "Março"],
          Q2: ["Abril", "Maio", "Junho"],
          Q4: ["Outubro", "Novembro", "Dezembro"], // Exemplo de quadrimestres limitados
        },
        2024: {
          Q2: ["Abril", "Maio", "Junho"],
          Q3: ["Julho", "Agosto", "Setembro"],
          Q4: ["Outubro", "Novembro", "Dezembro"],
        },
      },

      // Seletor de ano, quadrimestre e mês
      selectedYear: null,
      selectedQuarter: null,
      selectedMonth: null,

      // Variáveis filtradas
      filteredQuarters: [],
      filteredMonths: [],
    };
  },
  beforeMount() {
    useElementStore().separador = false;
    useElementStore().barraVertical = true;
  },
  beforeUnmount() {
    useElementStore().barraVertical = false;
    useElementStore().separador = true;
  },

  methods: {
    // Método chamado ao escolher um ano
    onYearChange() {
      // Resetar quadrimestre e mês selecionados
      this.selectedQuarter = null;
      this.selectedMonth = null;

      // Atualizar quadrimestres disponíveis com base no ano selecionado
      if (this.selectedYear) {
        this.filteredQuarters = Object.keys(this.data[this.selectedYear]);
      } else {
        this.filteredQuarters = [];
      }

      // Limpar os meses filtrados
      this.filteredMonths = [];
    },

    // Método chamado ao escolher um quadrimestre
    onQuarterChange() {
      // Resetar o mês selecionado
      this.selectedMonth = null;

      // Atualizar meses disponíveis com base no quadrimestre selecionado
      if (this.selectedYear && this.selectedQuarter) {
        this.filteredMonths =
          this.data[this.selectedYear][this.selectedQuarter];
      } else {
        this.filteredMonths = [];
      }
    },

    // Submeter o formulário
    submitForm() {
      this.$router.push("/gerar-resultados");

      console.log("Ano selecionado:", this.selectedYear);
      console.log("Quadrimestre selecionado:", this.selectedQuarter);
      console.log("Mês selecionado:", this.selectedMonth);
    },
  },
};
</script>
