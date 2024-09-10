import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import MainLogin from "../pages/MainLogin.vue";
import MainHome from "../pages/MainHome.vue";
import NovoExame from "../pages/NovoExame.vue";
import VerificarExames from "../pages/VerificarExames.vue";
import GerarResultados from "../pages/GerarResultados.vue";
import ResultadosExames from "src/pages/ResultadosExames.vue";

const routes = [
  {
    path: "/",
    component: MainLayout, // O MainLayout envolve as rotas
    children: [
      { path: "", component: MainLogin },
      { path: "home", component: MainHome },
      { path: "novo-exame", component: NovoExame },
      { path: "verificar-exames", component: VerificarExames },
      { path: "gerar-resultados", component: GerarResultados },
      { path: "resultados-exames", component: ResultadosExames },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
