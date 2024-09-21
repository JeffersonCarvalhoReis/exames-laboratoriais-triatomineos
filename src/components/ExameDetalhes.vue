<template>
  <div class="q-pa-md">

    <q-card flat style="width: 100%" v-if="loading">

      <q-card-section>
        <q-skeleton type="text" class="text-h6" />
        <q-separator class="q-my-md" />

        <q-skeleton type="text" width="50%" class="text-subtitle1" />
        <q-skeleton type="text" class="text-caption" />
        <q-skeleton type="text" class="text-caption" />
        <q-skeleton type="text" class="text-caption" />
        <q-item style="max-width: 300px">

          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item style="max-width: 300px">
          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item style="max-width: 300px">
          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator class="q-my-md" />

        <q-skeleton type="QBtn" width="170px" />

      </q-card-section>
    </q-card>

    <q-card v-else>
      <q-card-section>
        <div class="text-h6">Detalhes do Exame</div>
        <q-separator class="q-my-md" />

        <!-- Dados do exame -->
        <q-item-label>
          <strong>Data do Exame:</strong> {{ dataExameFormatada }}
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
              <q-item-label><strong>Código:</strong> <span class="text-uppercase">{{ item.codigo }}</span>
              </q-item-label>
              <q-item-label><strong>Nome:</strong> <span class="text-uppercase">{{ item.nome }}</span>
              </q-item-label>
              <q-item-label><strong>Resultado:</strong> <span class="text-uppercase"> {{
                item.resultado == "nao-examinado" ? "não examinado" : item.resultado }}</span>
              </q-item-label>
              <q-item-label><strong>Estágio:</strong> <span class="text-uppercase">{{
                (item.estagio == "adulto-macho" || item.estagio == "adulto") ? "adulto macho"
                  : item.estagio == "adulto-femea" ? "adulto fêmea" : item.estagio }}</span>
              </q-item-label>
              <q-item-label><strong>Captura:</strong> <span class="text-uppercase">{{ item.captura }}</span>
              </q-item-label>
              <q-separator class="q-mt-md" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions class="q-pa-lg">
        <q-btn label="Voltar" push icon="arrow_back " color="primary" style="padding: 0 20px 0 13px"
          @click="$router.go(-1)" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
  import { doc, getDoc } from "firebase/firestore";
  import { db } from "src/firebaseConfig";
  import { formatarData } from "src/utils/dateUtils";

  export default {
    data() {
      return {
        exame: {},
        loading: true,
      };
    },
    async created() {
      const exameId = this.$route.params.id; // Obtém o ID do exame da URL
      await this.buscarExame(exameId);
    },
    computed: {
      dataExameFormatada() {
        const data = this.exame.dataExame
        return formatarData(data)
      },

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
        } finally {
          this.loading = false;
        }
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
