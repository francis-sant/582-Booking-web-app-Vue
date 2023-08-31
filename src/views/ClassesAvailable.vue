<template>
  <div>
    <h1>Book My Class</h1>
    <StudentBooking />
  </div>
</template>

<script>
import StudentBooking from "@/components/StudentBooking.vue";

export default {
  name: "ClassesAvailable",
  components: {
    StudentBooking,
  },
};
</script>
