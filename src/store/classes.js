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

  async updateBookedClass(updatedStudent, updateBookedClassApi) {
    const success = await updateBookedClassApi(updatedStudent);

    if (success) {
      const updatedStudentIndex = this.bookedClasses.findIndex(
        (student) => student._id === updatedStudent._id
      );

      if (updatedStudentIndex !== -1) {
        this.bookedClasses[updatedStudentIndex] = updatedStudent;
      }
    } else {
      console.error("Error updating booked class");
    }
  },
  // async updateBookedClass(updatedStudent) {
  //   const success = await updateBookedClassApi(updatedStudent);

  //   if (success) {
  //     const updatedStudentIndex = this.bookedClasses.findIndex(
  //       (student) => student._id === updatedStudent._id
  //     );

  //     if (updatedStudentIndex !== -1) {
  //       this.bookedClasses[updatedStudentIndex] = updatedStudent;
  //     }
  //   } else {
  //     console.error("Error updating booked class");
  //   }
  // },

  // async updateBookedClass(updatedStudent) {
  //   const response = await fetch(`/classes/booking/${updatedStudent._id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updatedStudent),
  //   });

  //   if (response.ok) {
  //     const updatedStudentIndex = this.bookedClasses.findIndex(
  //       (student) => student._id === updatedStudent._id
  //     );

  //     if (updatedStudentIndex !== -1) {
  //       this.bookedClasses[updatedStudentIndex] = updatedStudent;
  //     }
  //   }
  // },
  //ps:class cannot be used as a variable name
});
