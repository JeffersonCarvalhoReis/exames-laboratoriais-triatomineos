import { defineStore } from "pinia";
import { getAuth } from "firebase/auth";

export const useUserStore = defineStore("user", {
  state: () => ({
    usuario: getAuth().currentUser.displayName,
  }),
});
