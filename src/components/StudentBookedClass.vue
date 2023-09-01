<template>
  <div>
    <h2>Student Class Dashboard</h2>
    <div class="studentsinfo">
      <div
        v-for="student in bookedClass[0]"
        :key="student._id"
        class="studentdetails"
      >
        <h3>My Classes Information</h3>
        <p>First Name: {{ student.firstName }}</p>
        <p>Email: {{ student.email }}</p>
        <p>Class Name: {{ student.className }}</p>
        <p>Selected Date: {{ student.selectedDate }}</p>
        <p>Selected Time: {{ student.selectedTime }}</p>

        <button @click="editBooking(student)">Reschedule My Class</button>

        <EditFormBookedClass
          :availableClasses="availableClasses"
          :bookedClasses="bookedClass"
          v-if="selectedStudent === student"
          :student="student"
          @save="updateStudentClass"
          @cancel="cancelEdit"
        />
      </div>
    </div>
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
    const availableClasses = ref(store.getAvClasses);
    const selectedStudent = ref(null);

    const editBooking = (bookingDetails) => {
      selectedStudent.value = bookingDetails;
    };

    const cancelEdit = () => {
      selectedStudent.value = null;
    };

    const updateStudentClass = async (updatedStudent) => {
      try {
        const { _id, ...updatedStudentDataWithoutId } = updatedStudent;

        const response = await fetch(
          `http://localhost:3000/classes/booking/rescheduled/${_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedStudentDataWithoutId),
          }
        );

        if (response.ok) {
          // Update the bookedClass array with the updated student information
          const updatedStudentIndex = bookedClass.value[0].findIndex(
            (student) => student._id === _id
          );

          if (updatedStudentIndex !== -1) {
            bookedClass.value[0][updatedStudentIndex] = updatedStudent;
          }

          selectedStudent.value = null; // Clear the selected student after updating
        } else {
          console.error("Error updating student:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    return {
      bookedClass,
      selectedStudent,
      editBooking,
      cancelEdit,
      updateStudentClass,
      availableClasses,
    };
  },
};
</script>

<style lang="scss"></style>
