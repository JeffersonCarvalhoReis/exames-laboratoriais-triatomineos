<!-- src/pages/Login.vue -->
<template>
  <q-page class="row justify-center">
    <HeaderDrawer />

    <q-card flat bordered class="login-card q-mt-lg">
      <q-card-section class="row items-center q-pa-md">
        <div class="col">
          <h3 class="text-h5 text-center q-mb-none">Login</h3>
          <p class="text-center text-caption q-mt-xs">
            Insira suas credenciais para acessar
          </p>
        </div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onLogin">
          <q-input
            v-model="email"
            label="Email"
            type="email"
            outlined
            clearable
            :rules="[(val) => !!val || 'O email é obrigatório']"
            class="q-mb-md"
          />
          <q-input
            v-model="senha"
            label="Senha"
            type="password"
            outlined
            clearable
            :rules="[(val) => !!val || 'A senha é obrigatória']"
            class="q-mb-md"
          />
          <div class="q-mt-md q-mb-sm">
            <q-btn
              label="Entrar"
              type="submit"
              color="primary"
              class="full-width"
            />
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions align="center" class="q-pa-none"> </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from 'src/firebaseConfig';
import { useElementStore } from "src/stores/elementsStore";
import { useAuthStore } from "src/stores/auth";
import HeaderDrawer from "src/components/HeaderDrawer.vue";
export default {
  components: { HeaderDrawer },
  name: "MainLogin",

  data() {
    return {
      email: "",
      senha: "",
      authStore: useAuthStore(),
    };
  },
  beforeMount() {
    useElementStore().separador = false;
  },
  beforeUnmount() {
    useElementStore().separador = true;
  },
  methods: {
    async onLogin() {
      this.authStore.login(this.email, this.senha);
    },
  },
};
</script>
<style scoped>
.login-card {
  margin-bottom: 20px;
  height: 100%;
  width: 500px;
  max-width: 90%;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.full-width {
  width: 100%;
}
</style>
