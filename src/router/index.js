import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";
import MainLayout from "../layouts/MainLayout.vue";
import MainLogin from "../pages/MainLogin.vue";
import MainHome from "../pages/MainHome.vue";
import NovoExame from "../pages/NovoExame.vue";
import VerificarExames from "../pages/VerificarExames.vue";
import GerarResultados from "../pages/GerarResultados.vue";
import ResultadosExames from "src/pages/ResultadosExames.vue";
import ExamesExcluidos from "src/pages/ExamesExcluidos.vue";

// const checkAuth = (to, from, next) => {
//   const authStore = useAuthStore();
//   if (!authStore.user) {
//     next("/");
//   } else {
//     next();
//   }
// };
const routes = [
  {
    path: "/",
    component: MainLayout, // O MainLayout envolve as rotas
    children: [
      { path: "", component: MainLogin },
      { path: "home", component: MainHome, meta: { requiresAuth: true } },
      {
        path: "novo-exame",
        component: NovoExame,
        meta: { requiresAuth: true },
      },
      {
        path: "verificar-exames",
        component: VerificarExames,
        meta: { requiresAuth: true },
      },
      {
        path: "gerar-resultados",
        component: GerarResultados,
        meta: { requiresAuth: true },
      },
      {
        path: "resultados-exames",
        component: ResultadosExames,
        meta: { requiresAuth: true },
      },
      {
        path: "excluidos-exames",
        component: ExamesExcluidos,
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (to.matched.some((record) => record.meta.requiresAuth) && !user) {
    // Redireciona para a página de login se não estiver autenticado
    next("/");
  } else {
    next();
  }
});

export default router;
