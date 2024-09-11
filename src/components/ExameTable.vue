<template>
  <q-table :rows="resultados" :columns="columns" row-key="dataExame" dense>
    <!-- Coluna da lupa para visualizar mais detalhes -->
    <template v-slot:body-cell-details="props">
      <q-td align="center">
        <q-btn
          icon="search"
          color="primary"
          flat
          @click="viewDetails(props.row)"
        />
      </q-td>
    </template>

    <!-- Coluna da lixeira para excluir a linha -->
    <template v-slot:body-cell-actions="props">
      <q-td align="center">
        <q-btn icon="delete" color="red" flat @click="excluir = true" />
        <q-dialog v-model="excluir" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="warning" color="negative" text-color="white" />
              <span class="q-ml-sm">Realmente deseja excluir esse exame?</span>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancelar" color="primary" v-close-popup />
              <q-btn
                flat
                label="Excluir Exame"
                color="negative"
                v-close-popup
                @click="excluirExame(props.row)"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-td>
    </template>
  </q-table>
</template>

<script>
export default {
  data() {
    return {
      excluir: false,
    };
  },
  props: {
    resultados: Array,
    columns: Array,
  },
  methods: {
    visualizarExame(id) {
      this.$router.push(`/exame/${id}`);
    },
    excluirExame(id) {
      this.$emit("excluir", id);
    },
  },
};
</script>
