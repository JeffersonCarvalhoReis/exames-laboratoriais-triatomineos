<template>
  <q-table :rows="resultados" :columns="columns" row-key="id" dense>
    <!-- Coluna da lixeira para excluir a linha -->
    <template v-slot:body-cell-actions="props">
      <q-td align="center">
        <q-btn icon="restore" color="positive" flat @click="restaurarExame(props.row)" />
        <q-dialog v-model="loading" persistent>
          <q-card class="q-dialog-plugin">
            <q-card-section class="q-pa-md" align="center">
              <q-spinner color="primary" size="50px" />
              <div class="q-mt-md">Restaurando exame...</div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-td>
    </template>
  </q-table>
</template>

<script>
  import { doc, updateDoc } from "firebase/firestore";
  import { db } from "src/firebaseConfig";
  export default {
    props: {
      resultados: Array,
      columns: Array,
      buscarExamesExcluidos: Function,
    },
    data() {
      return {
        loading: false
      }
    },
    methods: {
      async restaurarExame(exame) {
        this.loading = true
        try {
          const exameRef = doc(db, "exames", exame.id); // Use o ID do exame
          await updateDoc(exameRef, {
            deleted: false, // Marca o exame como excluído
          });
          await this.buscarExamesExcluidos();
          this.$q.notify({
            message: "Exame restaurado com sucesso.",
            type: "positive",
          }); // Atualiza a tabela para remover o exame excluído
        } catch (error) {
          this.$q.notify({
            message: "Falha ao restaurar exame.",
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
