<template>
  <HeaderDrawer />
  <!-- skeleton -->
  <div v-if="loading" class="q-mt-md">
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
        </tr>
      </tbody>
    </q-markup-table>

  </div>
  <!-- conteudo -->
  <div v-else>
    <ExameTableExcluidos class="q-mt-md" :resultados="resultados" :columns="columns"
      :buscarExamesExcluidos="buscarExamesExcluidos" />
  </div>
</template>

<script>
  import HeaderDrawer from "src/components/HeaderDrawer.vue";
  import ExameTableExcluidos from "src/components/ExameTableExcluidos.vue";
  import { collection, query, where, getDocs } from "firebase/firestore";
  import { db } from "src/firebaseConfig";
  import { formatarData } from "src/utils/dateUtils"
  export default {
    components: { HeaderDrawer, ExameTableExcluidos },
    data() {
      return {
        loading: true, // Controla o estado de carregamento

        resultados: [],
        columns: [
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
          { name: "actions", label: "Restaurar", align: "center" }, // Coluna para a lixeira
        ],
      };
    },
    methods: {

      async buscarExamesExcluidos() {
        try {
          // Configura a consulta para buscar exames excluídos
          const q = query(collection(db, "exames"), where("deleted", "==", true));

          // Obtém os documentos da consulta
          const querySnapshot = await getDocs(q);

          // Mapeia os documentos para extrair os dados
          const resultados = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          resultados.sort(
            (a, b) => new Date(b.dataExame) - new Date(a.dataExame)
          );

          // Atualiza o estado com os resultados
          this.resultados = resultados;
        } catch (error) {
          console.error("Erro ao buscar exames excluídos:", error);
        } finally {
          this.loading = false; // Finaliza o estado de carregamento

        }
      },
    },
    mounted() {
      // Chama o método para buscar exames excluídos ao montar o componente
      this.buscarExamesExcluidos();
    },
  };
</script>
