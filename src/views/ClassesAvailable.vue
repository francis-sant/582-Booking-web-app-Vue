<template>
  <div>
    <h1>Classes Available</h1>
    <StudentBooking />
  </div>
</template>

<script>
// import { useClassesStore } from "@/store/classes.js";
import StudentBooking from "@/components/StudentBooking.vue";

export default {
  name: "ClassesAvailable",
  components: {
    StudentBooking,
  },
};
</script>
