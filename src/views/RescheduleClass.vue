<template>
  <div class="about">
    <h1>Reschedule My Class</h1>
    <StudentBookedClass />
  </div>
</template>

<script>
import { useClassesStore } from "@/store/classes.js";
import StudentBookedClass from "@/components/StudentBookedClass.vue";
export default {
  name: "RescheduleClass",
  components: {
    StudentBookedClass,
  },
  data() {
    return {
      availableClasses: [],
      selectedStudent: null,
    };
  },
  methods: {
    updateStudentClass(updatedStudent) {
      //fetch here to update the student class in the database
      // After successful update, update the bookedClass array
      // and reset selectedStudent
      console.log("Updating student class:", updatedStudent);

      // method to update the class in the store
      // const updatedBookedClass = updateStudentClassInStore(updatedStudent);

      // Update the bookedClass array
      // this.bookedClass[0][updatedStudent._id] = updatedBookedClass;

      this.selectedStudent = null; // Reset selectedStudent after update
    },
  },
  created() {
    // this.availableClasses = [];

    // Rescheduling store happening here
    fetch(
      "https://cautious-goldfish-44j4rv5xwv5hg66-3000.app.github.dev/classes/booking/bookedclasses"
    )
      .then((response) => response.json())
      .then((rescheduledClasses) => {
        const classesStore = useClassesStore();
        classesStore.setRescheduled(rescheduledClasses);
        this.availableClasses = [rescheduledClasses];
        console.log("rescheduledClasses", this.availableClasses); // Set the data after fetching
      });
  },
};
</script>
