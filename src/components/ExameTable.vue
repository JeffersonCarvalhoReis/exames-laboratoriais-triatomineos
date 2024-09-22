<template>
  <q-table :rows="resultados" :columns="columns" row-key="id" dense>
    <!-- Coluna da lupa para visualizar mais detalhes -->
    <template v-slot:body-cell-details="props">
      <q-td align="center">
        <q-btn icon="search" color="primary" flat @click="visualizarExame(props.row)" />
      </q-td>
    </template>


    <!-- Coluna da lixeira para excluir a linha -->
    <template v-slot:body-cell-actions="props">
      <q-td align="center">
        <q-btn icon="delete" color="red" flat @click="confirmarExclusao(props.row)" />
        <q-dialog v-model="excluir" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="warning" color="negative" text-color="white" />
              <span class="q-ml-sm">Realmente deseja excluir esse exame?</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancelar" color="primary" v-close-popup />
              <q-btn flat label="Excluir Exame" color="negative" v-close-popup
                @click="excluirExame(exameSelecionado)" />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-dialog v-model="loading" persistent>
          <q-card class="q-dialog-plugin">
            <q-card-section class="q-pa-md" align="center">
              <q-spinner color="primary" size="50px" />
              <div class="q-mt-md">Excluindo exame...</div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-td>
    </template>
  </q-table>
</template>

<script>
  import { doc, updateDoc } from "firebase/firestore"; // Firebase Firestore imports
  import { db } from "src/firebaseConfig";

  export default {
    data() {
      return {
        excluir: false,
        exameSelecionado: null,
        loading: false // Para armazenar o exame selecionado para exclusão
      };
    },
    props: {
      resultados: Array,
      columns: Array,
      buscarResultados: {
        type: Function,
        required: true,
      },
    },
    methods: {
      visualizarExame(exame) {
        this.$router.push(`/detalhes-exame/${exame.id}`);
      },
      confirmarExclusao(exame) {
        this.exameSelecionado = exame; // Armazena o exame para exclusão
        this.excluir = true; // Abre o diálogo de confirmação
      },
      async excluirExame(exame) {
        this.loading = true
        try {
          const exameRef = doc(db, "exames", exame.id); // Use o ID do exame
          await updateDoc(exameRef, {
            deleted: true, // Marca o exame como excluído
          });
          await this.buscarResultados();
          this.$q.notify({
            message: "Exame excluído com sucesso.",
            type: "positive",
          }); // Atualiza a tabela para remover o exame excluído
        } catch (error) {
          this.$q.notify({
            message: "Falha ao excluir exame.",
            type: "negative",
          });
          console.error("Erro ao excluir exame:", error);
        } finally {
          this.loading = false
        }
      },
    },
  };
</script>
