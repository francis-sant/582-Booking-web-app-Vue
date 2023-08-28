<template>
  <div>
    <h1>Classes Available</h1>
    <!-- <MyClassesDisplay /> -->
    <StudentBooking />
    <!-- <ClassSelection /> -->
  </div>
</template>

<script>
// import MyClassesDisplay from "@/components/MyClassesDisplay.vue";
// import { useClassesStore } from "@/store/classes.js";
import StudentBooking from "@/components/StudentBooking.vue";
// import ClassSelection from "@/components/ClassSelection.vue";

export default {
  name: "ClassesAvailable",
  components: {
    StudentBooking,
    // ClassSelection,
  },
};
</script>
