<template>
  <div class="q-pa-md">
    <a href="#top" id="top"></a>
    <!-- Seção 1: Dados de Identificação -->
    <q-card class="q-pa-md q-mb-md">
      <q-card-section>
        <div class="text-h6">1. Dados de Identificação</div>
      </q-card-section>

      <q-card-section>
        <q-form>
          <div>
            <!-- PIT -->
            <q-field label="PIT:" stack-label>
              <div class="q-mb-md">
                <q-radio v-model="pit" val="sim" label="Sim" @update:model-value="clearInputValidation" />
                <q-radio v-model="pit" val="não" label="Não" @update:model-value="clearInputValidation" />
              </div>
            </q-field>
            <div class="row q-gutter-lg">
              <q-input v-model="numeroEtiqueta" :type="pit == 'sim' ? 'string' : 'number'" label="Nº da etiqueta"
                :readonly="pit === 'sim'" :rules="[(val) => etiquetaObrigatoria(val)]" lazy-rules @click="pitSim"
                class="q-mb-md col-md-2 col-11" ref="numeroEtiquetaInput" />

              <!-- Data do exame -->
              <q-input v-model="dataExame" class="col-md-2 col-11">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="dataExame" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer"> </q-icon>
                </template>
              </q-input>
              <q-input v-model="responsavel" label="Responsável pelo exame" class="q-mb-md col-md-7 col-11" />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <!-- Seção 2: Dados sobre Exame de Triatomíneos -->
    <q-form>
      <q-card class="q-pa-md q-mb-md" v-for="(exame, index) in exames" :key="index">
        <q-card-section v-show="index == 0">
          <div class="text-h6">2. Dados sobre Exame de Triatomíneos</div>
        </q-card-section>
        <q-card-section>
          <p class="text-weight-bold">{{ index + 1 }}º - Exame</p>
          <q-separator />
        </q-card-section>
        <div>
          <q-card-section>
            <div class="q-gutter-md">
              <!-- Espécie de triatomíneos -->
              <q-input v-model="exame.codigo" type="number" ref="codigoInput" label="Código da espécie de triatomíneos"
                class="q-mb-md" :rules="[(val) => !!val || 'Código da espécie é obrigatório']" required lazy-rules />
              <q-input filled v-model="exame.nome" label="Nome espécie de triatomíneos" placeholder="Nome da espécie"
                class="q-mb-md" readonly />

              <!-- Captura -->
              <q-field label="Captura:" stack-label>
                <div class="q-mb-md">
                  <div class="q-gutter-md">
                    <div class="q-mb-xs q-gutter-xs q-col-gutter-md row items-center">
                      <div class="col-auto">
                        <q-radio v-model="exame.captura" val="intra" label="INTRA" />
                      </div>
                      <div class="col-auto">
                        <q-radio v-model="exame.captura" val="peri" label="PERI" />
                      </div>
                    </div>
                  </div>
                </div>
              </q-field>

              <!-- Estágio -->
              <q-field label="Estágio:" stack-label>
                <div class="q-mb-md">
                  <div class="q-gutter-md">
                    <div class="q-mb-xs q-gutter-xs q-col-gutter-md row items-center">
                      <div class="col-auto">
                        <q-radio v-model="exame.estagio" val="ninfa" label="NINFA" />
                      </div>
                      <div class="col-auto">
                        <q-radio v-model="exame.estagio" val="adulto-macho" label="ADULTO MACHO" />
                      </div>
                      <div class="col-auto">
                        <q-radio v-model="exame.estagio" val="adulto-femea" label="ADULTO FÊMEA" />
                      </div>
                    </div>
                  </div>
                </div>
              </q-field>

              <!-- Resultado -->
              <q-field label="Resultado:" stack-label>
                <div class="q-mb-md">
                  <div class="q-gutter-md">
                    <div class="q-mb-xs q-gutter-xs q-col-gutter-md row items-center">
                      <div class="col-auto">
                        <q-radio v-model="exame.resultado" val="positivo" label="POSITIVO" />
                      </div>
                      <div class="col-auto">
                        <q-radio v-model="exame.resultado" val="negativo" label="NEGATIVO" />
                      </div>
                      <div class="col-auto">
                        <q-radio v-model="exame.resultado" val="nao-examinado" label="NÃO EXAMINADO" />
                      </div>
                    </div>
                  </div>
                </div>
              </q-field>

              <!-- Botão para apagar exame -->
              <q-btn glossy push color="white" text-color="negative" icon="delete" @click="removerExame(index)"
                v-if="exames.length > 1 && index > 0" class="q-mb-md">Excluir</q-btn>
            </div>
          </q-card-section>
          <!-- Separador -->
          <q-separator />
        </div>
      </q-card>
      <q-card align="center">
        <!-- Botão para adicionar mais exames -->
        <h6 class="titleAdd">Adicionar novo exame</h6>
        <q-btn round color="primary" icon="add" @click="adicionarExame" push class="q-ma-md" size="lg" />
      </q-card>
      <q-btn push label="Enviar" @click="confirmaEnvio = true" icon="fa-solid fa-cloud-arrow-up" color="primary"
        class="q-ma-md q-px-lg" />
      <q-dialog v-model="confirmaEnvio" persistent @close="confirmaEnvio = false">
        <q-card class="q-dialog-plugin" style="min-width: 300px">
          <q-card-section>
            <div class="text-h6">Confirmar Envio</div>
            <div class="q-mt-md">
              Você realmente deseja confirmar o envio dos exames?
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat v-close-popup label="Cancelar" color="negative" />
            <q-btn @click="btnConfirmar" flat label="Confirmar 8" color="positive" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="loading" persistent>
        <q-card class="q-dialog-plugin">
          <q-card-section class="q-pa-md" align="center">
            <q-spinner color="primary" size="50px" />
            <div class="q-mt-md">Enviando dados...</div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </q-form>
  </div>
</template>

<script>
  import SmoothScroll from "smooth-scroll";
  import { useUserStore } from "src/stores/userStore";
  import { db } from "src/firebaseConfig";
  import { collection, addDoc } from "firebase/firestore";
  import { formatarData } from "src/utils/dateUtils";

  export default {
    data() {
      return {
        pitAtivo: false,
        pit: "não",
        numeroEtiqueta: "",
        dataExame: formatarData(new Date()),
        responsavel: useUserStore().usuario,
        confirmaEnvio: false,
        enviando: false,
        loading: false,
        exames: [
          {
            codigo: "",
            nome: "",
            captura: "peri",
            estagio: "adulto-macho",
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

    mounted() {
      // Inicializa o smooth-scroll
      const scroll = new SmoothScroll('a[href*="#"]', {
        speed: 300,
        speedAsDuration: true,
      });
    },

    methods: {
      scrollToTop() {
        setTimeout(() => {
          const section = document.getElementById("top");
          if (section) {
            section.scrollIntoView({
              behavior: "smooth",
              block: "end",
            });
          }
        }, 200);
      },
      async btnConfirmar() {
        if (this.enviando) {
          return;
        }
        this.enviando = true;
        if (!this.verifcaEtiqueta()) {
          this.$refs.numeroEtiquetaInput.focus();
          this.$nextTick(() => {
            const inputElement =
              this.$refs.numeroEtiquetaInput.$el.querySelector("input");
            if (inputElement) {
              this.scrollToTop();
            }
          });
          this.$q.notify({
            type: "negative",
            timeout: 4500,
            message: "Preencha o campo número da etiqueta",
          });
          this.confirmaEnvio = false;
          this.enviando = false;
          return;
        }
        if (!this.verificarCamposObrigatorios()) {
          this.$q.notify({
            type: "negative",
            timeout: 3500,
            message: "Preencha o campo Código da espécie",
          });
          this.confirmaEnvio = false;
          this.enviando = false;
          return;
        }
        this.confirmaEnvio = false;
        try {
          await this.salvarExame();

          this.scrollToTop();
        } finally {
          this.enviando = false;
        }
        // document.querySelector("form").dispatchEvent(new Event("submit"));
      },
      formattedDate(data) {
        const [day, month, year] = data.split("/");
        return `${year}-${month}-${day}`;
      },
      clearInputValidation() {
        this.numeroEtiqueta = "";
        this.$refs.numeroEtiquetaInput.resetValidation();
      },
      verificarCamposObrigatorios() {
        return this.exames.every((exame) => exame.codigo && exame.nome);
      },
      verifcaEtiqueta() {
        return this.numeroEtiqueta;
      },
      async salvarExame() {
        const codigosInvalidos = this.codigosExames.filter(
          (codigo) => !this.especies[codigo]
        );
        if (codigosInvalidos.length > 0) {
          this.$q.notify({
            type: "negative",
            message:
              "Um ou mais códigos da espécie são inválidos, verifique novamente. Código inválido:  " +
              codigosInvalidos.join(", "),
          });
          return;
        }
        this.loading = true; // Começa o carregamento

        try {
          // Coleção "exames" no Firestore
          const docRef = await addDoc(collection(db, "exames"), {
            pit: this.pit,
            numeroEtiqueta: this.numeroEtiqueta,
            dataExame: this.formattedDate(this.dataExame),
            responsavel: this.responsavel,
            exames: this.exames,
            deleted: false, // Salva todos os exames de uma vez
          });

          // window.scrollTo({
          //   top: 0, // Define o topo da página
          //   behavior: "smooth", // Suaviza o efeito de rolagem
          // });
          this.$q.notify({
            message: "Exame salvo com sucesso!",
            type: "positive",
          });
          this.resetForm();
        } catch (e) {
          console.error("Erro ao salvar documento: ", e);
          this.$q.notify({
            message: "Erro ao salvar exame.",
            type: "negative",
          });
        } finally {
          this.confirmaEnvio = false;
          this.loading = false; // Encerra o carregamento
        }
      },
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

      resetForm() {
        this.pit = "não";
        this.numeroEtiqueta = "";
        this.dataExame = formatarData(new Date());
        this.responsavel = useUserStore().usuario;
        this.exames = [
          {
            codigo: "",
            nome: "",
            captura: "peri",
            estagio: "adulto-macho",
            resultado: "negativo",
          },
        ];
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
        const scrollPos = window.scrollY;

        this.exames.push({
          codigo: "",
          nome: "",
          captura: "peri",
          estagio: "adulto-macho",
          resultado: "negativo",
        });
        this.$nextTick(() => {
          window.scrollTo(0, scrollPos);
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
      verificaEstagio() {
        return this.exames.map((exame) => exame.estagio);
      },
    },
    watch: {
      verificaEstagio(newVal) {
        newVal.forEach((estagio, index) => {
          if (index < this.exames.length) {
            // Define o resultado dependendo do valor de "estagio"
            this.exames[index].resultado =
              estagio === "ninfa"
                ? "nao-examinado"
                : this.exames[index].resultado;
          }
        });
      },

      codigosExames(novoCodigo) {
        novoCodigo.forEach((codigo, index) => {
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

  .q-dialog-plugin {
    background-color: #fff;
    /* Cor de fundo branca para uma aparência limpa */
    border-radius: 8px;
    /* Bordas arredondadas */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* Sombra suave */
  }

  .q-card-section {
    padding: 16px;
    /* Padding interno */
  }

  .q-card-actions {
    border-top: 1px solid #ddd;
    /* Linha separadora */
    padding: 8px;
    /* Padding interno */
  }
</style>
