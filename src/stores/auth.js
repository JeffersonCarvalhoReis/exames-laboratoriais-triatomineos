import { defineStore } from "pinia";
import { getAuth } from "firebase/auth";
import { auth } from "src/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const router = useRouter();

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
      console.log("Erro de login:", error);
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
