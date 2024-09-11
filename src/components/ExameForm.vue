<template>
  <div class="q-pa-md">
    <!-- Seção 1: Dados de Identificação -->
    <q-card class="q-pa-md q-mb-md">
      <q-card-section>
        <div class="text-h6">1. Dados de Identificação</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent>
          <div class="">
            <!-- PIT -->
            <q-field label="PIT:" stack-label>
              <div class="q-mb-md">
                <q-radio
                  v-model="pit"
                  val="sim"
                  label="Sim"
                  @change="handlePitChange"
                />
                <q-radio
                  v-model="pit"
                  val="não"
                  label="Não"
                  @change="handlePitChange"
                />
              </div>
            </q-field>
            <div class="row q-gutter-lg">
              <q-input
                v-model="numeroEtiqueta"
                :type="pit == 'sim' ? 'string' : 'number'"
                label="Nº da etiqueta"
                :readonly="pit === 'sim'"
                :rules="[(val) => etiquetaObrigatoria(val)]"
                @click="pitSim"
                class="q-mb-md col-md-2 col-11"
                required
              />

              <!-- Data do exame -->
              <q-input v-model="dataExame" class="col-md-2 col-11">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="dataExame" mask="MM/DD/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer"> </q-icon>
                </template>
              </q-input>
              <q-input
                v-model="responsavel"
                label="Responsável pelo exame"
                class="q-mb-md col-md-7 col-11"
              />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <!-- Seção 2: Dados sobre Exame de Triatomíneos -->
    <q-form>
      <q-card
        class="q-pa-md q-mb-md"
        v-for="(exame, index) in exames"
        :key="index"
      >
        <q-card-section v-show="index == 0">
          <div class="text-h6">2. Dados sobre Exame de Triatomíneos</div>
        </q-card-section>
        <q-card-section>
          <p>{{ index + 1 }}º - Exame</p>
        </q-card-section>
        <div>
          <q-card-section>
            <div class="q-gutter-md">
              <!-- Espécie de triatomíneos -->
              <q-input
                v-model="exame.codigo"
                type="number"
                label="Código da espécie de triatomíneos"
                class="q-mb-md"
                :rules="[(val) => !!val || 'Código da espécie é obrigatório']"
                required
              />
              <q-input
                filled
                v-model="exame.nome"
                label="Nome espécie de triatomíneos"
                placeholder="Nome da espécie"
                class="q-mb-md"
                readonly
              />

              <!-- Captura -->
              <q-field label="Captura:" stack-label>
                <div class="q-mb-md">
                  <div class="q-gutter-md">
                    <div
                      class="q-mb-xs q-gutter-xs q-col-gutter-md row items-center"
                    >
                      <div class="col-auto">
                        <q-radio
                          v-model="exame.captura"
                          val="intra"
                          label="INTRA"
                        />
                      </div>
                      <div class="col-auto">
                        <q-radio
                          v-model="exame.captura"
                          val="peri"
                          label="PERI"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </q-field>

              <!-- Estágio -->
              <q-field label="Estágio:" stack-label>
                <div class="q-mb-md">
                  <div class="q-gutter-md">
                    <div
                      class="q-mb-xs q-gutter-xs q-col-gutter-md row items-center"
                    >
                      <div class="col-auto">
                        <q-radio
                          v-model="exame.estagio"
                          val="ninfa"
                          label="NINFA"
                        />
                      </div>
                      <div class="col-auto">
                        <q-radio
                          v-model="exame.estagio"
                          val="adulto"
                          label="ADULTO"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </q-field>

              <!-- Resultado -->
              <q-field label="Resultado:" stack-label>
                <div class="q-mb-md">
                  <div class="q-gutter-md">
                    <div
                      class="q-mb-xs q-gutter-xs q-col-gutter-md row items-center"
                    >
                      <div class="col-auto">
                        <q-radio
                          v-model="exame.resultado"
                          val="positivo"
                          label="POSITIVO"
                        />
                      </div>
                      <div class="col-auto">
                        <q-radio
                          v-model="exame.resultado"
                          val="negativo"
                          label="NEGATIVO"
                        />
                      </div>
                      <div class="col-auto">
                        <q-radio
                          v-model="exame.resultado"
                          val="nao-examinado"
                          label="NÃO EXAMINADO"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </q-field>

              <!-- Botão para apagar exame -->
              <q-btn
                glossy
                push
                color="white"
                text-color="negative"
                icon="delete"
                @click="removerExame(index)"
                v-if="exames.length > 1 && index > 0"
                class="q-mb-md"
                >Excluir</q-btn
              >
            </div>
          </q-card-section>
          <!-- Separador -->
          <q-separator />
        </div>
      </q-card>
      <q-card align="center">
        <!-- Botão para adicionar mais exames -->
        <h6 class="titleAdd">Adicionar novo exame</h6>
        <q-btn
          round
          color="primary"
          icon="add"
          @click="adicionarExame"
          push
          class="q-ma-md"
          size="lg"
        />
      </q-card>
      <q-btn
        push
        type="submit"
        label="Enviar"
        icon="fa-solid fa-cloud-arrow-up"
        color="primary"
        class="q-ma-md q-px-lg"
      />
    </q-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pitAtivo: false,
      pit: "não",
      numeroEtiqueta: "",
      dataExame: this.formatDate(new Date()),
      responsavel: "",
      exames: [
        {
          codigo: "",
          nome: "",
          captura: "peri",
          estagio: "adulto",
          resultado: "negativo",
        },
      ],
      especies: {
        1: "Triatoma infestans",
        2: "Triatoma sordida",
        3: "Triatoma brasiliensis",
        4: "Triatoma pseudomaculata",
        5: "Triatoma maculata",
        6: "Triatoma rubrofasciata",
        7: "Triatoma rubrovaria",
        8: "Triatoma vitticeps",
        9: "Triatoma melanocephala",
        10: "Triatoma tibiamaculata",
        11: "Triatoma petrochii",
        12: "Triatoma circunmaculata",
        13: "Triatoma guasu",
        14: "Triatoma pessoai (lenti)",
        15: "Triatoma matogrossensis",
        16: "Triatoma williami",
        17: "Panstrongylus megistus",
        18: "Panstrongylus lutzi",
        19: "Panstrongylus geniculatus",
        20: "Panstrongylus diasi",
        21: "Panstrongylus tupynambai",
        22: "Panstrongylus lignarius",
        23: "Rhodnius neglectus",
        24: "Rhodnius prolixus",
        25: "Rhodnius nasutus",
        26: "Rhodnius pictipes",
        27: "Rhodnius domesticus",
        28: "Rhodnius robustus",
        29: "Rhodnius brethesi",
        30: "Eratyrus mucronatus",
        31: "Microtriatoma trinidadensis",
        32: "Triatoma costalimai",
        33: "Triatoma deanei",
        34: "Triatoma arthurneivai",
        35: "Triatoma oliveirai",
        36: "Triatoma wygodzisnskyi",
        37: "Panstrongylus lenti",
        38: "Panstrongylus rufotuberculatus",
        39: "Cavernicola pilosa",
        40: "Psammolestes tertius",
        41: "Cavernicola lenti",
        42: "Parabelminus carioca",
        43: "Parabelminus yurupucu",
        44: "Belminus laportei",
        45: "Microtriatoma borbai",
        46: "Rhodnius Sherlocky",
        99: "Outros insetos",
      },
    };
  },

  methods: {
    etiquetaPit() {
      if (this.pit === "sim") {
        return (this.numeroEtiqueta = "PIT");
      } else {
        return this.numeroEtiqueta;
      }
    },
    etiquetaObrigatoria(val) {
      if (this.pit == "não") {
        return !!val || "Nº da etiqueta é obrigatório";
      }
      return true;
    },
    formatDate(date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    },
    addNotif() {
      this.$q.notify({
        message: "Novo exame adicionado.",
        type: "positive",
      });
    },
    removeNotif() {
      this.$q.notify({
        message: "Exame excluído.",
        color: "negative",
        icon: "delete",
      });
    },

    adicionarExame() {
      this.exames.push({
        codigo: "",
        nome: "",
        captura: "peri",
        estagio: "adulto",
        resultado: "negativo",
      });
      this.addNotif();
    },
    removerExame(index) {
      if (this.exames.length > 1) {
        this.exames.splice(index, 1);
        this.removeNotif();
      }
    },
  },
  computed: {
    codigosExames() {
      return this.exames.map((exame) => exame.codigo);
    },
  },
  watch: {
    codigosExames(novoCodigo) {
      novoCodigo.forEach((codigo, index) => {
        console.log(
          this.exames,
          this.responsavel,
          this.numeroEtiqueta,
          this.pit,
          this.dataExame
        );
        if (index < this.exames.length) {
          // Atualiza o nome da espécie baseado no código ou define um nome padrão
          this.exames[index].nome =
            codigo === ""
              ? ""
              : this.especies[codigo] !== undefined
              ? this.especies[codigo]
              : "Nome não encontrado";
        }
      });
    },
    pit() {
      // Se PIT for "sim", torna o campo Nº da etiqueta como somente leitura
      if (this.pit === "sim") {
        this.numeroEtiqueta = "PIT";
        this.pitAtivo = true;
      } else if (this.pit === "não") {
        this.pitAtivo = false;
      }
    },
  },
};
</script>
<style scoped>
.titleAdd {
  margin: 0;
}
</style>
