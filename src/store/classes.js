import { defineStore } from "pinia";

export const useClassesStore = defineStore("classes", {
  state: () => ({
    availableClasses: [],
    rescheduledClasses: [],
    bookedClasses: [],
  }),
  getters: {
    getAvClasses: (state) => state.availableClasses,
    getBookedClasses(state) {
      return state.bookedClasses;
    },
  },
  actions: {
    setAvClasses(classes) {
      this.availableClasses = classes;
    },
    setRescheduled(rescheduledClasses) {
      this.rescheduledClasses = rescheduledClasses;
    },
    addBookedClass(bookedClass) {
      this.bookedClasses.push(bookedClass);
    },
  },

  //ps:class cannot be used as a variable name
});
