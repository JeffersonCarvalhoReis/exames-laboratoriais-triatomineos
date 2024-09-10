<!-- src/pages/Login.vue -->
<template>
  <q-page class="row justify-center">
    <HeaderDrawer :logado="false" />

    <q-card flat bordered class="login-card">
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
          <q-input v-model="email" label="Email" type="email" outlined clearable
            :rules="[val => !!val || 'O email é obrigatório']" class="q-mb-md" />
          <q-input v-model="senha" label="Senha" type="password" outlined clearable
            :rules="[val => !!val || 'A senha é obrigatória']" class="q-mb-md" />
          <div class="q-mt-md q-mb-sm">
            <q-btn label="Entrar" type="submit" color="primary" class="full-width" />
          </div>
        </q-form>
      </q-card-section>

      <q-card-actions align="center" class="q-pa-none">
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
  import HeaderDrawer from 'src/components/HeaderDrawer.vue';
  export default {
    components: { HeaderDrawer },
    name: 'MainLogin',
    data() {
      return {
        email: '',
        senha: ''
      };
    },
    methods: {
      onLogin() {
        // Ação de login
        if (this.email && this.senha) {
          // Realize o login aqui
          this.$router.push('/home'); // Redireciona para o dashboard após login bem-sucedido
        }
      }
    }
  }
  // import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

  // export default {
  //   data() {
  //     return {
  //       email: '',
  //       password: '',
  //     };
  //   },
  //   methods: {
  //     async login() {
  //       const auth = getAuth();
  //       try {
  //         await signInWithEmailAndPassword(auth, this.email, this.password);
  //         this.$router.push('/dashboard'); // Redireciona para o dashboard após login bem-sucedido
  //       } catch (error) {
  //         console.error('Erro no login:', error.message);
  //       }
  //     },
  //   },
  // };
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
