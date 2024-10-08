<template>
  <q-page class="home-page q-mt-md">
    <HeaderDrawer />
    <!-- Implement the home page content here -->
    <div class="justify-left q-gutter-md q-ml-auto">
      <q-page-sticky position="bottom-right" :offset="[18, 18]" style="z-index: 1000;" v-if="$q.screen.lt.sm">

        <q-fab icon="add" direction="up" color="accent" vertical-actions-align="right">
          <q-fab-action icon="fa-solid fa-file-alt" label="NOVO EXAME" label-position="left" color="primary"
            @click="novoExame" />
          <q-fab-action icon="fa-solid fa-magnifying-glass" label="VERIFICAR EXAMES" label-position="left"
            color="secondary" @click="verificarExames" />
        </q-fab>
      </q-page-sticky>
      <template v-else>
        <q-btn icon="fa-solid fa-file-alt" label="NOVO EXAME" label-position="left" color="primary"
          @click="novoExame" />
        <q-btn icon="fa-solid fa-magnifying-glass" label="VERIFICAR EXAMES" label-position="left" color="secondary"
          @click="verificarExames" />
      </template>

    </div>
    <q-card-section class="q-pb-none">
      <h1 class="text-h6 text-uppercase q-mb-none">histórico de exames recentes</h1>
    </q-card-section>
    <div v-if="loading" class="q-mt-md q-mx-sm">
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
    <q-card-section v-else>
      <q-table :rows="exames" :columns="columns" row-key="id" flat bordered :dense="$q.screen.lt.sm">
        <template v-slot:body-cell-detalhes="props">
          <q-td align="center" :props="props">
            <q-btn icon="search" color="primary" flat @click="visualizarExame(props.row.id)" />
          </q-td>
        </template>
      </q-table>
    </q-card-section>

  </q-page>
</template>

<script>
  import HeaderDrawer from 'src/components/HeaderDrawer.vue';
  import { db } from 'src/firebaseConfig'; // ajuste o caminho se necessário
  import { collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
  import { formatarData } from 'src/utils/dateUtils';
  export default {
    components: { HeaderDrawer },
    data() {
      return {
        loading: true,
        exames: [],
        columns: [
          { name: 'detalhes', label: 'Detalhes', align: 'center' },
          { name: 'data', label: 'Data', align: 'center', field: 'data' },
          { name: 'especie', label: 'Responsável', align: 'center', field: 'responsavel' },
        ]
      };
    },
    async mounted() {
      await this.fetchExames();
      console.log(this.exames)
    },
    methods: {
      visualizarExame(id) {
        this.$router.push(`/detalhes-exame/${id}`);
        console.log(id)
      },
      novoExame() {
        // Aqui você pode redirecionar para a página de criação de novo exame
        this.$router.push('/novo-exame');
      },
      verificarExames() {
        // Aqui você pode redirecionar para a página de verificação de exames
        this.$router.push('/verificar-exames');
      },
      async fetchExames() {
        try {
          const examesCollection = collection(db, 'exames');
          const examesQuery = query(examesCollection, orderBy('dataExame', 'desc'), limit(10), where("deleted", "==", false));
          const querySnapshot = await getDocs(examesQuery);

          this.exames = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              data: formatarData(data.dataExame),
              responsavel: data.responsavel,
              deleted: data.deleted
            };
          });
        } catch (error) {
          console.error("Erro ao buscar exames:", error);
        } finally {
          this.loading = false
        }
      }
    },
  };
</script>

<style scoped>
  .barbeiro {
    width: 40%;
    min-width: 350px;
  }

  .q-page {
    min-height: 10px !important;
    /* Ajusta para não sobrepor o conteúdo ao cabeçalho */
  }
</style>
