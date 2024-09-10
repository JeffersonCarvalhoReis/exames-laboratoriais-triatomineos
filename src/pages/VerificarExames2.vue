<template>
  <q-page class="verificar-exames-page">
    <HeaderDrawer />
    <!-- Filters and ExameTable component -->
    <ExameTable :exames="exames" :columns="examesColumns" @excluir="excluirExame" />
    <q-btn label="Gerar Resultados" color="secondary" @click="gerarResultados" />
  </q-page>
</template>

<script>
  import HeaderDrawer from 'src/components/HeaderDrawer.vue';
  import ExameTable from '../components/ExameTable.vue';
  // import firebaseMixin from '../mixins/firebaseMixin';

  export default {
    components: { ExameTable, HeaderDrawer },
    // mixins: [firebaseMixin],
    data() {
      return {
        exames: [],
        examesColumns: [
          { name: 'data', label: 'Data do Exame', field: 'data' },
          { name: 'responsavel', label: 'Responsável pelo Exame', field: 'responsavel' },
          { name: 'acoes', label: 'Ações', field: 'acoes' }
        ]
      };
    },
    methods: {
      async verificarExames() {
        const filters = [];
        // Add filters based on selected values
        this.exames = await this.fetchData('exames', filters);
      },

      excluirExame(id) {
        this.deleteDocument('exames', id);
        this.exames = this.exames.filter(exame => exame.id !== id);
      },

      gerarResultados() {
        this.$router.push('/gerar-resultados');
      }
    }
  };
</script>
