import { defineStore } from "pinia";
import { auth } from "src/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const errorMessages = {
  "auth/invalid-email": "O e-mail fornecido é inválido.",
  "auth/user-disabled": "O usuário foi desativado.",
  "auth/user-not-found": "Não há nenhum usuário registrado com este e-mail.",
  "auth/wrong-password": "A senha fornecida está incorreta.",
  "auth/network-request-failed": "Falha na conexão com a rede.",
  "auth/too-many-requests":
    "Muitas tentativas de login. Tente novamente mais tarde.",
  "auth/email-already-in-use": "O e-mail fornecido já está em uso.",
  "auth/weak-password": "A senha fornecida é muito fraca.",
  "auth/requires-recent-login": "A ação requer um login recente.",
  "auth/invalid-credential":
    "Não foi possivel efetuar o login, confira email e senha",
  // Adicione outros códigos de erro e mensagens conforme necessário
};

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const router = useRouter();
  const $q = useQuasar();

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      user.value = userCredential.user;
      router.push("/home");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage =
        errorMessages[errorCode] || "Ocorreu um erro desconhecido.";
      console.log("teste", errorCode);

      $q.notify({
        message: errorMessage,
        color: "negative",
        timeout: 4000,
        icon: "warning",
      });
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      user.value = null;
      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer logout", error);
    }
  };

  return { user, login, logout };
});
