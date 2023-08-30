<template>
  <div>
    <div v-if="!editing">
      <p>Name: {{ student.name }}</p>
      <p>Email: {{ student.email }}</p>
      <button @click="editing = true">Edit</button>
    </div>
    <div v-else>
      <form @submit.prevent="updateStudent">
        <label for="name">Name:</label>
        <input v-model="editedName" type="text" id="name" />

        <label for="email">Email:</label>
        <input v-model="student.email" type="email" id="email" disabled />

        <button type="submit">Save</button>
        <button @click="cancelEdit">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStudentStore } from "@/store/student.js";

export default {
  setup() {
    const studentStore = useStudentStore();
    const student = studentStore.student;
    const editing = ref(false);
    const editedName = ref(student.firstName); // Use firstName instead of name

    const updateStudent = async () => {
      const updatedStudent = { _id: student._id, firstName: editedName.value };
      await studentStore.updateStudentInfo(updatedStudent);
      editing.value = false;
    };

    const cancelEdit = () => {
      editing.value = false;
      editedName.value = student.name;
    };

    return {
      student,
      editing,
      editedName,
      updateStudent,
      cancelEdit,
    };
  },
};
</script>
