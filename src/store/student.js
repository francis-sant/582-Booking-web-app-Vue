import { defineStore } from "pinia";

export const useStudentStore = defineStore("student", {
  state: () => ({
    student: {
      _id: "", // You'll set this value from the fetched data
      name: "",
      email: "",
    },
  }),
  actions: {
    async fetchStudentInfo() {
      // Call backend API to fetch student info and set it in state
      const response = await fetch("/api/student");
      const data = await response.json();
      this.student = data;
    },
    async updateStudentInfo(updatedInfo) {
      this.student = { ...this.student, ...updatedInfo }; // Update the state
      // Call backend API to update student info in the database
      const response = await fetch(`/api/classes/booking/${updatedInfo._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedInfo),
      });
      const data = await response.json();
      console.log(data); // Log the response from the API
    },
  },
});
