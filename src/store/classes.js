import { defineStore } from "pinia";

export const useClassesStore = defineStore("classes", {
  state: () => ({
    availableClasses: [],
    bookedTimeSlots: {}, // Track booked time slots for each class
    bookedClasses: [], // Track booked classes for each student
  }),
  getters: {
    getAvClasses: (state) => state.availableClasses,
  },
  actions: {
    setAvClasses(classes) {
      this.availableClasses = classes;
    },
    setBookedTimeSlots(bookedTimeSlots) {
      this.bookedTimeSlots = bookedTimeSlots;
    },
    addBookedClass(bookedClass) {
      this.bookedClasses.push(bookedClass);
    },
  },
  //ps:class cannot be used as a variable name
});
