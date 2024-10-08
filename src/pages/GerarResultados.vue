<template>
  <q-page class="gerar-resultados-page">
    <HeaderDrawer title="Gerar Resultados" />

    <!-- Skeleton Loader -->
    <div v-if="loading" class="q-mt-md q-mx-sm">
      <q-skeleton type="text" class="text-h4" width="300px" />

      <q-skeleton type="text" width="200px" class="q-my-sm" />

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
          </tr>
        </thead>

        <tbody>
          <tr v-for="n in 6" :key="n">
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
          </tr>
        </tbody>
      </q-markup-table>
      <q-skeleton type="QBtn" width="170px" />

    </div>

    <!-- Content -->
    <div v-else class="q-mx-sm">
      <div v-for="(exames, key) in quadrimestresOrdenadosFormatados" :key="key" class="q-mb-md">
        <p class="text-h6 text-uppercase q-mt-md">{{ exames.key }}</p>
        <div>
          De {{ exames.menorData }} até
          {{ exames.maiorData }}
        </div>

        <ExameTable class="q-mt-md" :resultados="exames.resultados" :columns="columns"
          :buscarResultados="buscarResultados" />
        <div class="row no-wrap">
          <q-btn label="Gerar Resultados" color="secondary" @click="gerarResultados(key)" />
          <q-space />
          <q-btn label="gerar pdf" icon="fa-regular fa-file-pdf" color="secondary" @click="gerarPDF(exames.key)" />
        </div>


        <q-separator class="q-mt-md" v-if="quadrimestresOrdenados.length > 1" />
        <div class="q-mt-md"></div>
      </div>
      <ExameTable class="q-mt-md" :resultados="resultadosPorQuadrimestre" :columns="columns"
        :buscarResultados="buscarResultados" v-if="semResultado" />
    </div>
    <q-dialog v-model="downloading" persistent>
      <q-card class="q-dialog-plugin">
        <q-card-section class="q-pa-md" align="center">
          <q-spinner color="primary" size="50px" />
          <div class="q-mt-md">Aguarde...</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
  import { collection, getDocs, query, where } from "firebase/firestore"; // Firebase Firestore imports
  import { db } from "src/firebaseConfig";
  import { useResultadoStore } from 'stores/resultadoStore';
  import { formatarData } from "src/utils/dateUtils";
  import HeaderDrawer from "src/components/HeaderDrawer.vue";
  import ExameTable from "src/components/ExameTable.vue";
  import { jsPDF } from "jspdf";

  export default {
    components: { HeaderDrawer, ExameTable },
    data() {
      return {
        loading: true, // Controla o estado de carregamento
        semResultado: true,
        resultadosPorQuadrimestre: [], // Aqui será preenchido com dados reais
        downloading: false,
        columns: [
          { name: "details", label: "Detalhes", align: "center" }, // Coluna para a lupa
          {
            name: "dataExame",
            label: "Data do Exame",
            field: "dataExame",
            align: "center",
            format: (val) => formatarData(val),
          },
          {
            name: "responsavel",
            label: "Responsável",
            field: "responsavel",
            align: "center",
          },
          { name: "actions", label: "Excluir", align: "center" }, // Coluna para a lixeira
        ],
        intervaloDatas: { start: "", end: "" },
        quadrimestre: "",
        anoQuadrimestre: "",
        menorData: "",
        maiorData: "",
      };
    },

    async mounted() {

      await this.buscarResultados();
    },

    computed: {
      quadrimestresOrdenados() {
        return Object.keys(this.resultadosPorQuadrimestre)
          .sort((a, b) => {
            const ultimoResultadoA = new Date(
              this.resultadosPorQuadrimestre[a].maiorData
            );
            const ultimoResultadoB = new Date(
              this.resultadosPorQuadrimestre[b].maiorData
            );
            return ultimoResultadoB - ultimoResultadoA; // Ordenar em ordem decrescente
          })
          .map((key) => ({
            key,
            ...this.resultadosPorQuadrimestre[key],
          }));
      },
      quadrimestresOrdenadosFormatados() {
        const ordenados = this.quadrimestresOrdenados;

        return ordenados.map((item) => ({
          key: item.key,
          resultados: item.resultados,
          menorData: formatarData(item.menorData),
          maiorData: formatarData(item.maiorData),
        }));
      }
    },

    methods: {

      async gerarPDF(key) {
        this.downloading = true
        const quadrimestreSelecionado = this.quadrimestresOrdenadosFormatados.find(exame => exame.key === key);

        // Filtra os resultados que pertencem ao mesmo quadrimestre
        const resultadosDoQuadrimestre = this.quadrimestresOrdenadosFormatados.filter(exame => {
          return exame.key === quadrimestreSelecionado.key;
        });

        const self = this;
        resultadosDoQuadrimestre.forEach(exame => {
          self.gerarPDFPorExame(exame);
        });
      },
      quebrarLinhaSeNecessario(texto) {
        // Verifica se o texto tem mais de 20 caracteres
        if (texto.length > 18) {
          // Encontra o primeiro espaço após o caractere 20
          const indexEspaco = texto.indexOf(' ', 1);

          // Se houver um espaço após o caractere 20, quebra a linha
          if (indexEspaco !== -1) {
            // Retorna o texto com uma quebra de linha na posição do espaço
            return texto.slice(0, indexEspaco) + '\n ' + texto.slice(indexEspaco + 1);
          }
        }

        // Se não houver um espaço ou o texto for curto, retorna o texto original
        return texto;
      },
      gerarPDFPorExame(exame) {

        const doc = new jsPDF();
        const margemEsquerda = 15;
        const margemDireita = 195; // 210mm largura total menos 15mm de margem
        const primeiroDist = 71;
        const segundaDist = 103;
        const terceiraDist = 150;
        const alturaPagina = doc.internal.pageSize.getHeight(); // altura da página
        const espacamentoAssinatura = 30; // Espaço reservado para assinaturas no final
        const alturaLinha = 5;

        let y = 15; // Posição inicial no eixo Y


        exame.resultados.forEach((resultado, index) => {
          // Cabeçalho
          const textoFS = 'FS - FUNDAÇÃO NACIONAL DE SAÚDE';
          const textoPCDC = 'PROGRAMA DE CONTROLE DA DOENÇA DE CHAGAS';
          const textoForm = 'FORMULÁRIO DE EXAME DE TRIATOMÍNEOS'
          // Definir a fonte e o tamanho (opcional)
          doc.setFontSize(10);

          // Calcula a largura do texto
          const textFSWidth = doc.getTextWidth(textoFS);
          const textPCDCWidth = doc.getTextWidth(textoPCDC);
          // Largura do PDF (padrão A4 é 210mm)
          const pageWidth = doc.internal.pageSize.getWidth();

          // Calcula a posição X para centralizar o texto
          const xFS = (pageWidth - textFSWidth) / 2;
          const xPCDC = (pageWidth - textPCDCWidth) / 2;

          // Insere o texto no PDF na posição centralizada
          doc.text(textoFS, xFS, y);
          y += 5;
          doc.text(textoPCDC, xPCDC, y);
          y += 7;
          doc.setFontSize(14);

          const textFormWidth = doc.getTextWidth(textoForm);
          const xFORM = (pageWidth - textFormWidth) / 2;
          doc.text(textoForm, xFORM, y);
          y += 7;
          doc.rect(15, 10, 180, 20, 'S');  // retangulo do cabeçalho

          doc.setFontSize(10);
          doc.text("1 - Dados de Identificação", margemEsquerda, y);
          y += alturaLinha;
          doc.text("Número da Etiqueta", margemEsquerda + 8, y);
          doc.text("Data do Exame", 71, y + 2);
          doc.text("Responsável pelo Exame", 125, y);
          y += alturaLinha;
          doc.setFontSize(12);
          doc.text(`${resultado.numeroEtiqueta}`, margemEsquerda + 20, y + 3);

          doc.setFontSize(10);
          doc.text(`${formatarData(resultado.dataExame)}`, 74, y + 3);
          const resp = doc.getTextWidth(resultado.responsavel);
          const xResp = (95 - resp) / 2
          doc.text(`${resultado.responsavel}`, 95 + xResp, y + 3);

          doc.rect(margemEsquerda, 36, 50, 12, 'S') //retangulo do numero da etiqueta
          doc.rect(68, 36, 30, 12, 'S') //retangulo da data do exame
          doc.rect(100, 36, 95, 12, 'S') //retangulo do nome do responsavel


          y += alturaLinha + 3;


          doc.text("2 - Dados sobre exame de triatomíneos", margemEsquerda, y);
          y += alturaLinha;

          // Iterar sobre os dados para preencher a tabela
          if (resultado.exames && resultado.exames.length > 0) {

            let rect = 53 //define posição y inicial dos retangulos
            // Itera sobre os exames e exibe os detalhes
            resultado.exames.forEach((exameDetalhe, exameIndex) => {
              // doc.text(`  Exame ${exameIndex + 1}:`, margemEsquerda, y);
              // y += alturaLinha;
              doc.text(`Espécie de triatomíneos`, margemEsquerda + 5, y);

              doc.rect(margemEsquerda, rect, 50, 22, 'S')//retangulo da Espécie de triatomíneos
              doc.rect(68, rect, 30, 22, 'S')//retangulo da Captura
              doc.rect(100, rect, 45, 22, 'S')//retangulo do Estágio
              doc.rect(147, rect, 50, 22, 'S')//retangulo do Resultado

              doc.rect(margemEsquerda + 1, rect + 5, 15, 15, 'S')//retangulo do código
              doc.rect(margemEsquerda + 17, rect + 5, 32, 15, 'S')//retangulo do nome da especie

              doc.rect(69, rect + 6, 5, 4, 'S')//retangulo de seleção de captura
              doc.rect(69, rect + 16, 5, 4, 'S')//retangulo de seleção de captura

              doc.rect(101, rect + 6, 5, 4, 'S')//retangulo de seleção de estágio
              doc.rect(101, rect + 11, 5, 4, 'S')//retangulo de seleção de estágio
              doc.rect(101, rect + 16, 5, 4, 'S')//retangulo de seleção de estágio

              doc.rect(148, rect + 6, 5, 4, 'S')//retangulo de seleção de resultado
              doc.rect(148, rect + 11, 5, 4, 'S')//retangulo de seleção de resultado
              doc.rect(148, rect + 16, 5, 4, 'S')//retangulo de seleção de resultado
              rect += 25

              doc.text(`Captura`, primeiroDist + 5, y);
              doc.text(`Estágio`, segundaDist + 10, y);
              doc.text(`Resultado`, terceiraDist + 5, y);

              y += alturaLinha;
              doc.setFontSize(7);
              doc.text(`Código`, margemEsquerda + 4, y);

              doc.setFontSize(10);
              doc.text(` Nome`, 42, y);

              doc.addFont('/fonts/checkmark2.ttf', 'checkmark', 'normal');
              doc.setFont('checkmark');
              doc.setFontSize(13);
              doc.text(`${exameDetalhe.captura == "intra" ? "\u0000" : ""}`, primeiroDist - 2, y + 1);
              doc.setFont('Helvetica');
              doc.setFontSize(10);
              doc.text(` 1 - Intra`, primeiroDist + 3, y);

              doc.addFont('/fonts/checkmark2.ttf', 'checkmark', 'normal');
              doc.setFont('checkmark');
              doc.setFontSize(13);
              doc.text(`${exameDetalhe.estagio == "ninfa" ? "\u0000" : ""}`, segundaDist - 2, y + 1);
              doc.setFont('Helvetica');
              doc.setFontSize(10);
              doc.text(` 1 - Ninfa`, segundaDist + 3, y);

              doc.addFont('/fonts/checkmark2.ttf', 'checkmark', 'normal');
              doc.setFont('checkmark');
              doc.setFontSize(13);
              doc.text(`${exameDetalhe.resultado == "positivo" ? "\u0000" : ""}`, terceiraDist - 2, y + 1);
              doc.setFont('Helvetica');
              doc.setFontSize(10);
              doc.text(` 1 - Positivo`, terceiraDist + 3, y);
              y += alturaLinha;

              doc.text(` ${exameDetalhe.codigo}`, margemEsquerda + 5, y);
              doc.text(` ${this.quebrarLinhaSeNecessario(exameDetalhe.nome)}`, 32, y);

              doc.addFont('/fonts/checkmark2.ttf', 'checkmark', 'normal');
              doc.setFont('checkmark');
              doc.setFontSize(13);
              doc.text(`${exameDetalhe.estagio == "adulto-macho" || exameDetalhe.estagio == "adulto" ? "\u0000" : ""}`, segundaDist - 2, y + 1);
              doc.setFont('Helvetica');
              doc.setFontSize(10);
              doc.text(` 2 - Adulto Macho`, segundaDist + 3, y);

              doc.addFont('/fonts/checkmark2.ttf', 'checkmark', 'normal');
              doc.setFont('checkmark');
              doc.setFontSize(13);
              doc.text(`${exameDetalhe.resultado == "negativo" ? "\u0000" : ""}`, terceiraDist - 2, y + 1);
              doc.setFont('Helvetica');
              doc.setFontSize(10);
              doc.text(` 2 - Negativo`, terceiraDist + 3, y);
              y += alturaLinha;

              doc.addFont('/fonts/checkmark2.ttf', 'checkmark', 'normal');
              doc.setFont('checkmark');
              doc.setFontSize(13);
              doc.text(`${exameDetalhe.captura == "peri" ? "\u0000" : ""}`, primeiroDist - 2, y + 1);
              doc.setFont('Helvetica');
              doc.setFontSize(10);
              doc.text(` 2 - Peri`, primeiroDist + 3, y);

              doc.addFont('/fonts/checkmark2.ttf', 'checkmark', 'normal');
              doc.setFont('checkmark');
              doc.setFontSize(13);
              doc.text(`${exameDetalhe.estagio == "adulto-femea" ? "\u0000" : ""}`, segundaDist - 2, y + 1);
              doc.setFont('Helvetica');
              doc.setFontSize(10);
              doc.text(` 3 - Adulto Fêmea`, segundaDist + 3, y);

              doc.addFont('/fonts/checkmark2.ttf', 'checkmark', 'normal');
              doc.setFont('checkmark');
              doc.setFontSize(13);
              doc.text(`${exameDetalhe.resultado == "nao-examinado" ? "\u0000" : ""}`, terceiraDist - 2, y + 1);
              doc.setFont('Helvetica');
              doc.setFontSize(10);
              doc.text(` 3 - Não Examinado`, terceiraDist + 3, y);
              y += alturaLinha + 5;

              //acresenta mais uma pagina se o conteudo ultrapassar uma pagina
              if (y + espacamentoAssinatura > alturaPagina - 20) {
                this.adicionarAssinaturas(doc, margemEsquerda, margemDireita, alturaPagina - espacamentoAssinatura);

                doc.addPage();
                y = 15
                const textoFS = 'FS - FUNDAÇÃO NACIONAL DE SAÚDE';
                const textoPCDC = 'PROGRAMA DE CONTROLE DA DOENÇA DE CHAGAS';
                const textoForm = 'FORMULÁRIO DE EXAME DE TRIATOMÍNEOS'
                // Definir a fonte e o tamanho (opcional)
                doc.setFontSize(10);

                // Calcula a largura do texto
                const textFSWidth = doc.getTextWidth(textoFS);
                const textPCDCWidth = doc.getTextWidth(textoPCDC);
                // Largura do PDF (padrão A4 é 210mm)
                const pageWidth = doc.internal.pageSize.getWidth();

                // Calcula a posição X para centralizar o texto
                const xFS = (pageWidth - textFSWidth) / 2;
                const xPCDC = (pageWidth - textPCDCWidth) / 2;

                // Insere o texto no PDF na posição centralizada
                doc.text(textoFS, xFS, y);
                y += 5;
                doc.text(textoPCDC, xPCDC, y);
                y += 7;
                doc.setFontSize(14);

                const textFormWidth = doc.getTextWidth(textoForm);
                const xFORM = (pageWidth - textFormWidth) / 2;
                doc.text(textoForm, xFORM, y);
                y += 7;
                doc.rect(15, 10, 180, 20, 'S');  // retangulo do cabeçalho

                doc.setFontSize(10);
                doc.text("1 - Dados de Identificação", margemEsquerda, y);
                y += alturaLinha;
                doc.text("Número da Etiqueta", margemEsquerda + 8, y);
                doc.text("Data do Exame", 71, y + 2);
                doc.text("Responsável pelo Exame", 125, y);
                y += alturaLinha;

                doc.setFontSize(12);
                doc.text(`${resultado.numeroEtiqueta}`, margemEsquerda + 20, y + 3);

                doc.setFontSize(10);
                doc.text(`${formatarData(resultado.dataExame)}`, 74, y + 3);
                const resp = doc.getTextWidth(resultado.responsavel);
                const xResp = (95 - resp) / 2
                doc.text(`${resultado.responsavel}`, 95 + xResp, y + 3);

                doc.rect(margemEsquerda, 36, 50, 12, 'S') //retangulo do numero da etiqueta
                doc.rect(68, 36, 30, 12, 'S') //retangulo da data do exame
                doc.rect(100, 36, 95, 12, 'S') //retangulo do nome do responsavel


                y += alturaLinha + 3;


                doc.text("2 - Dados sobre exame de triatomíneos", margemEsquerda, y);
                y += alturaLinha;  // Redesenha o cabeçalho
                rect = 53
                doc.rect(margemEsquerda, rect, 50, 22, 'S')//retangulo da Espécie de triatomíneos
                doc.rect(68, rect, 30, 22, 'S')//retangulo da Captura
                doc.rect(100, rect, 45, 22, 'S')//retangulo do Estágio
                doc.rect(147, rect, 50, 22, 'S')//retangulo do Resultado

                doc.rect(margemEsquerda + 1, rect + 5, 15, 15, 'S')//retangulo do código
                doc.rect(margemEsquerda + 17, rect + 5, 32, 15, 'S')//retangulo do nome da especie

                doc.rect(69, rect + 6, 5, 4, 'S')//retangulo de seleção de captura
                doc.rect(69, rect + 16, 5, 4, 'S')//retangulo de seleção de captura

                doc.rect(101, rect + 6, 5, 4, 'S')//retangulo de seleção de estágio
                doc.rect(101, rect + 11, 5, 4, 'S')//retangulo de seleção de estágio
                doc.rect(101, rect + 16, 5, 4, 'S')//retangulo de seleção de estágio

                doc.rect(148, rect + 6, 5, 4, 'S')//retangulo de seleção de resultado
                doc.rect(148, rect + 11, 5, 4, 'S')//retangulo de seleção de resultado
                doc.rect(148, rect + 16, 5, 4, 'S')//retangulo de seleção de resultado
                y = 57; // Reseta a posição vertical
              }
            });
          }
          this.adicionarAssinaturas(doc, margemEsquerda, margemDireita, alturaPagina - espacamentoAssinatura);

          //uma pagina por resultado
          if (index < exame.resultados.length - 1) {
            doc.addPage();

            y = 15;
          }
        });

        doc.save(`Exames do ${exame.key}.pdf`);
        this.downloading = false


      },
      adicionarAssinaturas(doc, margemEsquerda, margemDireita, posicaoY) {
        const larguraAssinatura = 80;

        // Campo de assinatura 1
        doc.line(margemEsquerda, posicaoY, margemEsquerda + larguraAssinatura, posicaoY); // Linha para a assinatura
        doc.text("Supervisor", margemEsquerda, posicaoY + 5); // Texto "Assinatura 1"

        // Campo de assinatura 2
        doc.line(margemDireita - larguraAssinatura, posicaoY, margemDireita, posicaoY); // Linha para a assinatura
        doc.text("Responsável pelos exames", margemDireita - larguraAssinatura, posicaoY + 5); // Texto "Assinatura 2"
      },
      getQuarterFromDate(date) {

        const month = date.getMonth() + 1; // Months are 0-based
        if (month >= 1 && month <= 4) return "1º";
        if (month >= 5 && month <= 8) return "2º";
        if (month >= 9 && month <= 12) return "3º";
        return "";
      },
      getQuarterFromMonth(month) {
        if (month >= 1 && month <= 4) return "1º";
        if (month >= 5 && month <= 8) return "2º";
        return "3º";
      },
      getLastDayOfMonth(year, month) {
        return new Date(year, month, 0).getDate();
      },
      async buscarResultados() {
        const year = this.$route.query.year;
        const month = this.$route.query.month;

        this.anoQuadrimestre = year;
        if (month) {
          this.quadrimestre = this.getQuarterFromMonth(month);
        } else {
          this.quadrimestre = this.$route.query.quarter;
        }

        let start, end;

        if (month) {
          start = `${year}-${month}-01`;
          const lastDayOfMonth = this.getLastDayOfMonth(year, month);
          end = `${year}-${month}-${lastDayOfMonth}`;
        } else if (this.quadrimestre === "1º") {
          start = `${year}-01-01`;
          end = `${year}-04-30`;
        } else if (this.quadrimestre === "2º") {
          start = `${year}-05-01`;
          end = `${year}-08-31`;
        } else if (this.quadrimestre === "3º") {
          start = `${year}-09-01`;
          end = `${year}-12-31`;
        } else {
          start = `${year}-01-01`;
          end = `${year}-12-31`;
        }

        this.intervaloDatas = { start, end };

        let q;

        if (year) {
          q = query(
            collection(db, "exames"),
            where("dataExame", ">=", start),
            where("dataExame", "<=", end),
            where("deleted", "==", false)
          );
        } else {
          q = query(collection(db, "exames"), where("deleted", "==", false));
        }

        const querySnapshot = await getDocs(q);

        let resultadosPorQuadrimestre = {};

        querySnapshot.forEach((doc) => {
          const data = new Date(doc.data().dataExame);
          data.setHours(data.getHours() + 3)
          const quadrimestre = this.getQuarterFromDate(data);
          const ano = data.getFullYear();
          const key = `${quadrimestre} quadrimestre de ${ano}`;
          this.semResultado = false;

          if (!resultadosPorQuadrimestre[key]) {
            resultadosPorQuadrimestre[key] = { resultados: [] };
          }

          resultadosPorQuadrimestre[key].resultados.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        for (const quadrimestre in resultadosPorQuadrimestre) {
          let resultados = resultadosPorQuadrimestre[quadrimestre].resultados;

          if (resultados.length > 0) {
            resultados = resultados.sort(
              (b, a) => new Date(a.dataExame) - new Date(b.dataExame)
            );

            const datas = resultados.map(
              (resultado) => new Date(resultado.dataExame)
            );
            const menorData = new Date(Math.min(...datas));
            const maiorData = new Date(Math.max(...datas));

            resultadosPorQuadrimestre[quadrimestre].resultados = resultados;
            resultadosPorQuadrimestre[quadrimestre].menorData = menorData;
            resultadosPorQuadrimestre[quadrimestre].maiorData = maiorData;
          }
        }

        this.resultadosPorQuadrimestre = resultadosPorQuadrimestre;
        this.loading = false; // Finaliza o estado de carregamento
      },

      gerarResultados(key) {
        const resultadoStore = useResultadoStore();

        resultadoStore.setResultado({
          key: this.quadrimestresOrdenados[key].key,
          resultados: this.quadrimestresOrdenados[key].resultados,
          menorData: this.quadrimestresOrdenados[key].menorData,
          maiorData: this.quadrimestresOrdenados[key].maiorData
        });

        this.$router.push({ path: '/resultados-exames' });
      },
    },
  };
</script>
