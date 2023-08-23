import { defineStore } from "pinia";

export const useClassesStore = defineStore("classes", {
  state: () => ({
    services: [],
    classes: [],
  }),

  actions: {
    createServices(service) {
      this.services.push(service);
    },
    createClasses(aula) {
      this.classes.push(aula);
    },
  },
  //ps:class cannot be used as a variable name
});
