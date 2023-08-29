import { defineStore } from "pinia";

export const useTeacherStore = defineStore("teacher", {
  state: () => ({
    availableClasses: [],
    bookedClasses: [],
  }),
  getters: {
    getAvClasses: (state) => state.availableClasses,
  },
  actions: {
    setAvClasses(classes) {
      this.availableClasses = classes;
    },
  },
});
