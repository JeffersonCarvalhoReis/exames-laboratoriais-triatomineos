<template>
  <q-page class="page">
    <HeaderDrawer />
    <q-card class="card">
      <q-card-section>
        <div class="text-h6">Editar Perfil</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-form ref="form" @submit.prevent>
          <!-- Nome -->
          <q-input v-model="displayName" label="Nome do Responsável" outlined class="q-mb-md" />

          <!-- E-mail -->
          <q-input v-model="email" label="E-mail" outlined type="email" class="q-mb-md"
            :rules="[(val) => !!val || 'O email é obrigatório']" />

          <!-- Nova senha -->
          <q-input v-model="password" label="Nova Senha" outlined type="password" class="q-mb-md" />

          <q-input v-model="confirmPassword" label="Confirmar Senha" outlined type="password" class="q-mb-md"
            :rules="[validaConfirmacaoSenha]" lazy-rules />


          <q-btn label="Salvar" color="primary" @click="validateForm" />
        </q-form>
      </q-card-section>
    </q-card>

    <!-- Diálogo de Erro -->
    <q-dialog v-model="errorDialog">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="negative" text-color="white" />
          <div class="text-h6 q-ml-md">Erro</div>
        </q-card-section>
        <q-card-section>
          <span class="q-ml-sm">{{ errorMessage }} </span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Diálogo de Sucesso -->

    <q-dialog v-model="confirmDialog">
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">Confirmar</div>
        </q-card-section>
        <q-card-section>
          <span class="q-ml-sm">Deseja salvar esses dados?</span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="negative" v-close-popup />
          <q-btn flat label="Confirmar" color="primary" v-close-popup @click="onSubmit" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
  import { useQuasar } from "quasar";
  import HeaderDrawer from "src/components/HeaderDrawer.vue";
  import { getAuth, updateProfile, updateEmail, updatePassword } from "firebase/auth";
  import { ref } from "vue";

  export default {
    components: { HeaderDrawer },
    setup() {
      const $q = useQuasar()
      const auth = getAuth();
      const user = auth.currentUser;

      // Dados do formulário
      const displayName = ref(user?.displayName || "");
      const email = ref(user?.email || "");
      const password = ref(""); // Apenas para nova senha
      const errorDialog = ref(false);
      const confirmDialog = ref(false);
      const errorMessage = ref("");
      const confirmPassword = ref('');
      const form = ref(null);

      const errorMessages = {
        'auth/email-already-in-use': 'O e-mail informado já está em uso.',
        'auth/invalid-email': 'O e-mail informado é inválido.',
        'auth/user-not-found': 'Usuário não encontrado.',
        'auth/wrong-password': 'Senha incorreta.',
        'auth/requires-recent-login': 'Ação só permitida após realizar o login novamente.',
        'auth/weak-password': 'A senha fornecida é muito fraca, use pelos menos 6 caracteres.',
        'auth/user-disabled': 'Esta conta foi desativada.',
        'auth/operation-not-allowed': 'O método de autenticação está desativado.',
        'auth/popup-closed-by-user': 'A janela de autenticação foi fechada antes de concluir.',
        'auth/account-exists-with-different-credential': 'Já existe uma conta com este e-mail, mas com um provedor diferente.'
        // Adicione mais erros conforme necessário
      };



      const validaConfirmacaoSenha = (val) => {
        return val === password.value || 'As senhas não coincidem';
      };

      // Função de submit
      const onSubmit = async () => {
        try {
          // Atualizar o nome do usuário e foto de perfil
          if (displayName.value !== user.displayName) {
            await updateProfile(user, {
              displayName: displayName.value,
            });

          }

          // Atualizar o email
          if (email.value !== user.email) {
            await updateEmail(user, email.value);
          }

          // Atualizar a senha (se uma nova senha for fornecida)
          if (password.value) {
            await updatePassword(user, password.value);
          }

          $q.notify({
            message: "Perfil atualizado com sucesso.",
            color: "positive",
            timeout: 3000,
            icon: "check_circle",
          });
        } catch (error) {

          errorMessage.value = errorMessages[error.code] || 'Ocorreu um erro desconhecido.';
          errorDialog.value = true;
        }
      };
      const validateForm = () => {
        form.value.validate().then((valid) => {
          if (valid) {
            confirmDialog.value = true; // Exibir o diálogo de confirmação
          } else {
            $q.notify({
              message: "Corrija os campos para salvar.",
              color: "negative",
              timeout: 3000,
              icon: "warning",
            });
          }
        });

      };

      return {
        displayName,
        email,
        password,
        confirmPassword,
        onSubmit,
        errorDialog,
        validaConfirmacaoSenha,
        confirmDialog,
        errorMessage,
        validateForm,
        form
      };
    },
  };
</script>

<style scoped>
  .page {
    max-width: 80vh;
    margin: 15px;
  }

  .card {
    padding-bottom: 20px;
    border-radius: 10px;
  }

  @media (min-width: 780px) {
    .page {
      margin: 15px auto;
    }

    .card {
      padding: 10px 25px;
    }
  }

  @media (min-width: 1300px) {
    .card {
      padding: 15px 50px;
    }
  }
</style>
