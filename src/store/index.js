// import { createStore } from "vuex";

// export default createStore({
//   state: {},
//   getters: {},
//   mutations: {},
//   actions: {},
//   modules: {},
// });

import { defineStore } from "pinia";

export const useItemsStore = defineStore("myClasses", {
  state: () => ({ myClasses: [] }), // Inicializa um array vazio para os itens
  actions: {
    async fetchItems() {
      try {
        const response = await fetch("http://localhost:3000/items"); // preciso colocar o endPoint correto aqui, onde o meu local host está rodando da mongodb e do meu router. router have to match com o endpoint do mongo.js
        const data = await response.json(); // recebe a resposta numa variavel e passa pelo Json.
        this.myClasses = data; // atribui o valor de data para o array vazio
        return data; // retorna o valor de data
      } catch (error) {
        console.error(error);
      }
    },
  },
});
