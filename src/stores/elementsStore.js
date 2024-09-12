import { defineStore } from "pinia";

export const useElementStore = defineStore("elements", {
  state: () => ({
    separador: true,
    barraVertical: true,
    iconeExame: false,
    menuExcluido: false,
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    // increment() {
    //   this.counter++;
    // },
  },
});
