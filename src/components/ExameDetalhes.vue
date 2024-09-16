<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">Detalhes do Exame</div>
        <q-separator class="q-my-md" />

        <!-- Dados do exame -->
        <q-item-label>
          <strong>Data do Exame:</strong> {{ formatarData(exame.dataExame) }}
        </q-item-label>
        <q-item-label>
          <strong>Etiqueta:</strong> {{ exame.numeroEtiqueta }}
        </q-item-label>
        <q-item-label>
          <strong>Responsável:</strong> {{ exame.responsavel }}
        </q-item-label>

        <!-- Lista de exames -->
        <q-item-label>
          <strong>Exames:</strong>
        </q-item-label>
        <q-list>
          <q-item v-for="(item, index) in exame.exames" :key="index">
            <q-item-section>
              <p class="text-uppercase text-bold">{{ index + 1 }}º exame</p>
              <q-item-label
                ><strong>Código:</strong> {{ item.codigo }}</q-item-label
              >
              <q-item-label
                ><strong>Nome:</strong> {{ item.nome }}</q-item-label
              >
              <q-item-label
                ><strong>Resultado:</strong> {{ item.resultado }}</q-item-label
              >
              <q-item-label
                ><strong>Estágio:</strong> {{ item.estagio }}</q-item-label
              >
              <q-item-label
                ><strong>Captura:</strong> {{ item.captura }}</q-item-label
              >
              <q-separator />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions>
        <q-btn flat label="Voltar" color="primary" @click="$router.go(-1)" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { doc, getDoc } from "firebase/firestore";
import { db } from "src/firebaseConfig";

export default {
  data() {
    return {
      exame: {},
    };
  },
  async created() {
    const exameId = this.$route.params.id; // Obtém o ID do exame da URL
    await this.buscarExame(exameId);
  },
  methods: {
    async buscarExame(id) {
      try {
        const exameRef = doc(db, "exames", id);
        const docSnap = await getDoc(exameRef);

        if (docSnap.exists()) {
          this.exame = { id: docSnap.id, ...docSnap.data() };
        } else {
          console.log("Nenhum exame encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar exame:", error);
      }
    },
    formatarData(data) {
      return new Date(data).toLocaleDateString("pt-BR");
    },
  },
};
</script>

<style scoped>
.q-card {
  max-width: 600px;
  margin: auto;
}
</style>
