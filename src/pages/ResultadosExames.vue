<template>
  <q-page>
    <HeaderDrawer title="resultados" />
    <!-- skeleton -->
    <div v-if="loading" class="q-mt-md">
      <q-skeleton type="text" class="text-h4" width="300px" />
      <q-skeleton type="text" width="200px" class="q-my-sm" />
      <q-skeleton type="text" class="text-subtitle1" width="350px" />


      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left" style="width: 150px">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-left" style="width: 150px">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-left" style="width: 150px">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-left" style="width: 150px">
              <q-skeleton animation="blink" type="text" />
            </th>
            <td class="text-left">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
            <td class="text-left">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
          </tr>
        </thead>

        <tbody>
          <tr v-for="n in 4" :key="n">
            <td class="text-left">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
            <td class="text-left">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
            <td class="text-left">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
            <td class="text-left">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
            <td class="text-left">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
      <q-skeleton type="text" class="text-subtitle1 q-my-lg" width="350px" />

      <q-markup-table>
        <thead>
          <tr>
            <th class="text-left" style="width: 150px">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-left" style="width: 150px">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-left" style="width: 150px">
              <q-skeleton animation="blink" type="text" />
            </th>
            <th class="text-left" style="width: 150px">
              <q-skeleton animation="blink" type="text" />
            </th>
            <td class="text-left">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
            <td class="text-left">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
          </tr>
        </thead>

        <tbody>
          <tr v-for="n in 4" :key="n">
            <td class="text-left">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
            <td class="text-right">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
            <td class="text-left">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
            <td class="text-left">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
            <td class="text-left">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
            <td class="text-left">
              <q-skeleton animation="blink" type="text" width="85px" />
            </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>

    <!-- conteudo principal -->
    <div v-else>
      <p class="text-h5 text-uppercase q-mt-lg q-mx-md">{{ quadrimestre }}</p>
      <p class="text-bold q-mt-lg q-mx-md">De {{ menorDataFormatada }}
        até
        {{ maiorDataFormatada }}</p>
      <ExameResultadoTable
        message="Identificação e detecção da infecção natural de triatomíneos quadrimestral (por vigilância ativa -  aplicada pelo SUS)"
        :resultados="resultados" :columns="columns" />
      <q-separator class="q-my-md" />
      <ExameResultadoTable
        message="PITs - Identificação e detecção da infecção natural de triatomíneos quadrimestral (por vigilância passiva – vigilância popular)"
        :resultados="resultadosPits" :columns="columns" />
    </div>
  </q-page>
</template>

<script>
  import ExameResultadoTable from 'src/components/ExameResultadoTable.vue';
  import HeaderDrawer from 'src/components/HeaderDrawer.vue';
  import { useResultadoStore } from 'stores/resultadoStore';
  import { formatarData } from 'src/utils/dateUtils';

  export default {
    components: { HeaderDrawer, ExameResultadoTable },

    data() {
      return {

        loading: true, // Controla o estado de carregamento

        columns: [
          { name: "codigo_ibge", field: "codigo_ibge", label: "Código IBGE" },
          { name: "municipio", field: "municipio", label: "Município" },
          { name: "grau_risco", field: "grau_risco", label: "Grau de Risco" },
          { name: "especie", field: "especie", label: "Espécie" },
          {
            name: "a_intra_capturado",
            field: "a_intra_capturado",
            label: "Intra - Capturado - Adulto",
          },
          {
            name: "n_intra_capturado",
            field: "n_intra_capturado",
            label: "Intra - Capturado - Ninfa",
          },
          {
            name: "t_intra_capturado",
            field: "t_intra_capturado",
            label: "Intra - Capturado - Total",
          },
          {
            name: "a_intra_analisado",
            field: "a_intra_analisado",
            label: "Intra - Analisado - Adulto",
          },
          {
            name: "n_intra_analisado",
            field: "n_intra_analisado",
            label: "Intra - Analisado - Ninfa",
          },
          {
            name: "t_intra_analisado",
            field: "t_intra_analisado",
            label: "Intra - Analisado - Total",
          },
          {
            name: "a_intra_positivo",
            field: "a_intra_positivo",
            label: "Intra - Positivo - Adulto",
          },
          {
            name: "n_intra_positivo",
            field: "n_intra_positivo",
            label: "Intra - Positivo - Ninfa",
          },
          {
            name: "t_intra_positivo",
            field: "t_intra_positivo",
            label: "Intra - Positivo - Total",
          },
          {
            name: "a_peri_capturado",
            field: "a_peri_capturado",
            label: "Peri - Capturado - Adulto",
          },
          {
            name: "n_peri_capturado",
            field: "n_peri_capturado",
            label: "Peri - Capturado - Ninfa",
          },
          {
            name: "t_peri_capturado",
            field: "t_peri_capturado",
            label: "Peri - Capturado - Total",
          },
          {
            name: "a_peri_analisado",
            field: "a_peri_analisado",
            label: "Peri - Analisado - Adulto",
          },
          {
            name: "n_peri_analisado",
            field: "n_peri_analisado",
            label: "Peri - Analisado - Ninfa",
          },
          {
            name: "t_peri_analisado",
            field: "t_peri_analisado",
            label: "Peri - Analisado - Total",
          },
          {
            name: "a_peri_positivo",
            field: "a_peri_positivo",
            label: "Peri - Positivo - Adulto",
          },
          {
            name: "n_peri_positivo",
            field: "n_peri_positivo",
            label: "Peri - Positivo - Ninfa",
          },
          {
            name: "t_peri_positivo",
            field: "t_peri_positivo",
            label: "Peri - Positivo - Total",
          },
        ],
        resultados: [],
        resultadosPits: [],
        quadrimestre: "",
        todosResultados: ""

      }
    },

    mounted() {
      const resultadoStore = useResultadoStore();

      // Acessando os dados do resultado salvos no Pinia
      const resultado = resultadoStore.resultado;
      this.todosResultados = resultado

      if (resultado) {
        this.quadrimestre = resultado.key
      }
      const pitExames = resultado.resultados.filter(exame => exame.pit === "sim")
      const naoPitExames = resultado.resultados.filter(exame => exame.pit === "não")

      const resultsPits = this.groupAndSumBySpecies(pitExames)
      const results = this.groupAndSumBySpecies(naoPitExames)

      this.resultados = Object.values(results)
      this.resultadosPits = Object.values(resultsPits)
    },
    computed: {
      menorDataFormatada() {
        const data = this.todosResultados.menorData
        return formatarData(data)
      },
      maiorDataFormatada() {
        const data = this.todosResultados.maiorData
        return formatarData(data)
      },
    },
    methods: {

      groupAndSumBySpecies(examesData) {
        const groupedResults = {};

        examesData.forEach(document => {
          document.exames.forEach(exame => {
            const especie = exame.codigo;
            if (!groupedResults[especie]) {
              groupedResults[especie] = {
                codigo_ibge: "2915353",
                municipio: "Itaguaçu da Bahia",
                grau_risco: "ALTO",
                especie: especie,
                a_intra_capturado: 0,
                n_intra_capturado: 0,
                t_intra_capturado: 0,
                n_intra_analisado: 0,
                a_intra_analisado: 0,
                t_intra_analisado: 0,
                a_intra_positivo: 0,
                n_intra_positivo: 0,
                t_intra_positivo: 0,

                a_peri_capturado: 0,
                n_peri_capturado: 0,
                t_peri_capturado: 0,
                a_peri_analisado: 0,
                n_peri_analisado: 0,
                t_peri_analisado: 0,
                a_peri_positivo: 0,
                n_peri_positivo: 0,
                t_peri_positivo: 0,
              };
            }

            // Somar os adultos, ninfas e total capturados no intra
            if (exame.captura === 'intra') {
              if (exame.estagio === 'adulto-macho' || exame.estagio === 'adulto-femea' || exame.estagio === 'adulto') {
                groupedResults[especie].a_intra_capturado += 1;
                if (exame.resultado != 'nao-examinado') {
                  groupedResults[especie].a_intra_analisado += 1;
                }
                if (exame.resultado == 'positivo') {
                  groupedResults[especie].a_intra_positivo += 1;
                }
              } else if (exame.estagio === 'ninfa') {
                groupedResults[especie].n_intra_capturado += 1;
                if (exame.resultado != 'nao-examinado') {
                  groupedResults[especie].n_intra_analisado += 1;
                }
                if (exame.resultado == 'positivo') {
                  groupedResults[especie].n_intra_positivo += 1;
                }
              }
              groupedResults[especie].t_intra_capturado = groupedResults[especie].a_intra_capturado + groupedResults[especie].n_intra_capturado;
              groupedResults[especie].t_intra_analisado = groupedResults[especie].a_intra_analisado + groupedResults[especie].n_intra_analisado;
              groupedResults[especie].t_intra_positivo = groupedResults[especie].a_intra_positivo + groupedResults[especie].n_intra_positivo;

            }

            // Somar os adultos, ninfas e total capturados no peri
            if (exame.captura === 'peri') {
              if (exame.estagio === 'adulto-macho' || exame.estagio === 'adulto-femea' || exame.estagio === 'adulto') {
                groupedResults[especie].a_peri_capturado += 1;
                if (exame.resultado != 'nao-examinado') {
                  groupedResults[especie].a_peri_analisado += 1;
                }
                if (exame.resultado == 'positivo') {
                  groupedResults[especie].a_peri_positivo += 1;
                }
              } else if (exame.estagio === 'ninfa') {
                groupedResults[especie].n_peri_capturado += 1;
                if (exame.resultado != 'nao-examinado') {
                  groupedResults[especie].n_peri_analisado += 1;
                }
                if (exame.resultado == 'positivo') {
                  groupedResults[especie].n_peri_positivo += 1;
                }
              }
              groupedResults[especie].t_peri_capturado = groupedResults[especie].a_peri_capturado + groupedResults[especie].n_peri_capturado;
              groupedResults[especie].t_peri_analisado = groupedResults[especie].a_peri_analisado + groupedResults[especie].n_peri_analisado;
              groupedResults[especie].t_peri_positivo = groupedResults[especie].a_peri_positivo + groupedResults[especie].n_peri_positivo;

            }
            this.loading = false; // Finaliza o estado de carregamento


          });
        });

        return groupedResults;
      }

    }

  }

</script>

<style scoped></style>
