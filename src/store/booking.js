import { defineStore } from "pinia";

export const useSchoolStore = defineStore("school", {
  state: () => ({ students: [], teachers: [] }),
  getters: {
    getStudents: (state) => state.students,
    getTeachers: (state) => state.teachers,
  },
  actions: {
    addStudent(teacher) {
      this.students.push(teacher);
    },
    addTeacher(student) {
      this.teachers.push(student);
    },
  },
});
