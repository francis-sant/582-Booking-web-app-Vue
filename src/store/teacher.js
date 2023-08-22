import { defineStore } from "pinia";

export const useTeacherStore = defineStore("teacher", {
  state: () => ({
    schedules: [],
  }),
  actions: {
    async addSchedule(schedule) {
      try {
        await fetch("http://localhost:3000/teacherclasses/booked", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(schedule),
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
});
