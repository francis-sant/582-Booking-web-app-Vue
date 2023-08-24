import { defineStore } from "pinia";

export const useClassesStore = defineStore("classes", {
  state: () => ({
    availableClasses: [],
  }),

  actions: {
    setAvClasses(classes) {
      this.availableClasses = classes;
    },
  },
  //ps:class cannot be used as a variable name
});
