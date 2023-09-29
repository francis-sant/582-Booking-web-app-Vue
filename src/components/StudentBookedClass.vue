<template>
  <div>
    <h2>My Bookings</h2>
    <div class="studentsinfo">
      <div v-if="bookedClass[0].length === 0">
        <p>No classes booked yet.</p>
      </div>

      <div
        v-for="student of bookedClasses"
        :key="student._id"
        class="studentdetails"
      >
        <h3>My Class</h3>
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
import { ref, onMounted, computed } from "vue";
import { useBookingLogic } from "@/composables/bookingLogic.js";

export default {
  components: {
    EditFormBookedClass,
  },

  setup() {
    const store = useClassesStore();
    const bookedClass = computed(() => {
      return store.getBookedClasses;
    });
    const { fetchBookedClasses } = useBookingLogic();
    const bookedClasses = ref([]);

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
          `https://cautious-goldfish-44j4rv5xwv5hg66-3000.app.github.dev/student/rescheduled/${_id}`,
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

          selectedStudent.value = null;
        } else {
          console.error("Error updating student:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    onMounted(() => {
      fetchBookedClasses();
      const latestPosition = bookedClass.value.length - 1;
      bookedClasses.value = bookedClass.value[latestPosition];
      console.log(bookedClasses.value);
    });

    return {
      bookedClasses,
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
