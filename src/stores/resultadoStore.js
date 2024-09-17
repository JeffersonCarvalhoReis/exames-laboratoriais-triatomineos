import { defineStore } from "pinia";

export const useResultadoStore = defineStore("resultadoStore", {
  state: () => ({
    resultado: null,
  }),
  actions: {
    setResultado(dados) {
      this.resultado = dados;
    },
  },
  persist: {
    enabled: true, // Ativa a persistência para essa store
    strategies: [
      {
        key: "resultado", // Nome da chave no storage
        storage: localStorage, // Usa o localStorage para persistir
      },
    ],
  },
});
