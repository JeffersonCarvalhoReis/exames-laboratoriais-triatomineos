import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import MainLayout from "../layouts/MainLayout.vue";
import MainLogin from "../pages/MainLogin.vue";
import MainHome from "../pages/MainHome.vue";
import NovoExame from "../pages/NovoExame.vue";
import VerificarExames from "../pages/VerificarExames.vue";
import GerarResultados from "../pages/GerarResultados.vue";
import ResultadosExames from "src/pages/ResultadosExames.vue";
import ExamesExcluidos from "src/pages/ExamesExcluidos.vue";
import EditarPerfil from "src/pages/EditarPerfil.vue";
import ExameDetalhesPage from "src/pages/ExameDetalhesPage.vue";

const routes = [
  {
    path: "/",
    component: MainLayout, // O MainLayout envolve as rotas
    children: [
      { path: "", component: MainLogin, meta: { guestOnly: true } },
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
      {
        path: "editar-perfil",
        component: EditarPerfil,
        meta: { requiresAuth: true },
      },
      {
        path: "detalhes-exame/:id",
        component: ExameDetalhesPage,
        meta: { requiresAuth: true },
        props: true,
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
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const guestOnly = to.matched.some((record) => record.meta.guestOnly);

  // Espera até que o Firebase carregue o estado de autenticação do usuário
  onAuthStateChanged(auth, (user) => {
    if (requiresAuth && !user) {
      // Se a rota requer autenticação e o usuário não está autenticado
      next("/");
    } else if (guestOnly && user) {
      // Se o usuário está autenticado e tenta acessar uma rota de login, redireciona para a página "home"
      next("/home");
    } else {
      // Permite o acesso às rotas
      next();
    }
  });
});

export default router;
