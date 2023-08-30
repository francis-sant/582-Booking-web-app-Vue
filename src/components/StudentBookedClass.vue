<template>
  <div>
    <h2>Student Class Dashboard</h2>
    <div
      v-for="student in bookedClass[0]"
      :key="student._id"
      class="student-details"
    >
      <h3>My Classes Information</h3>
      <p>First Name: {{ student.firstName }}</p>
      <p>Email: {{ student.email }}</p>
      <p>Class Name: {{ student.className }}</p>
      <p>Selected Date: {{ student.selectedDate }}</p>
      <p>Selected Time: {{ student.selectedTime }}</p>

      <button @click="editBooking(student, true)">Edit</button>
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

    const cancelEdit = () => {
      selectedStudent.value = null;
    };

    return {
      bookedClass,
      selectedStudent,
      editBooking,
      cancelEdit,
    };
  },
  methods: {
    async updateStudentClass(updatedStudent) {
      try {
        const response = await fetch(
          `http://localhost:3000/classes/booking`, // Assuming you have an _id field in your student object
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedStudent),
          }
        );

        if (response.ok) {
          // Update store or necessary state
          console.log(updatedStudent);
          this.selectedStudent = null;
        } else {
          console.error("Error updating student:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } // Remove the comma from here
    },
  },
};
</script>
