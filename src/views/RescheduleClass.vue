<template>
  <div class="about">
    <h1>Reschedule My Class</h1>
    <StudentBookedClass @edit-booking="editBooking" />
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
    async editBooking(student, editMode) {
      if (editMode) {
        // This is for editing the student
        this.selectedStudent = student;
      } else {
        // This is for emitting the student details to the form
        this.$emit("edit-booking", student);
        console.log("emmiting edit");
      }
    },
  },

  created() {
    // this.availableClasses = [];

    // Rescheduling store happening here
    fetch("http://localhost:3000/classes/booking/bookedclasses")
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
