<template>
  <div>
    <h2>Student Class Dashboard</h2>
    <div
      v-for="(student, index) in bookedClass[0]"
      :key="index"
      class="student-details"
    >
      <h3>My Classes Information</h3>
      <p>First Name: {{ student.firstName }}</p>
      <p>Email: {{ student.email }}</p>
      <p>Class Name: {{ student.className }}</p>
      <p>Selected Date: {{ student.selectedDate }}</p>
      <p>Selected Time: {{ student.selectedTime }}</p>

      <button @click="editBooking(student)">Edit</button>
      <hr />
    </div>
    <EditFormBookedClass
      v-if="selectedStudent"
      :student="selectedStudent"
      @save="updateStudentClass"
      @cancel="cancelEdit"
    />
  </div>
</template>

<script>
import { useClassesStore } from "@/store/classes.js";
import EditFormBookedClass from "@/components/EditFormBookedClass.vue";

import { ref } from "vue";

export default {
  components: {
    EditFormBookedClass,
  },
  setup() {
    const store = useClassesStore();
    const bookedClass = ref(store.getBookedClasses);
    const selectedStudent = ref(null);

    const editBooking = (bookingDetails) => {
      selectedStudent.value = bookingDetails;
    };

    const updateStudentClass = async (updatedInfo) => {
      await store.updateBookedClass(updatedInfo);
      selectedStudent.value = null;
    };

    const cancelEdit = () => {
      selectedStudent.value = null;
    };

    return {
      bookedClass,
      selectedStudent,
      editBooking,
      updateStudentClass,
      cancelEdit,
    };
  },
};
</script>
