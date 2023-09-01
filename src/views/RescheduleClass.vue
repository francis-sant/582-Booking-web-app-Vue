<template>
  <div class="bookedClasses">
    <StudentBookedClass :bookedClasses="bookedClass" />
  </div>
</template>

<script>
import { useBookingLogic } from "@/composables/bookingLogic.js"; // Import the composable
import StudentBookedClass from "@/components/StudentBookedClass.vue";
import { onMounted } from "vue";

export default {
  name: "RescheduleClass",
  components: {
    StudentBookedClass,
  },
  setup() {
    const { fetchBookedClasses, bookedClass } = useBookingLogic(); // Destructure the returned values
    // Call the fetchBookedClasses function when the component is mounted
    onMounted(() => {
      fetchBookedClasses();
    });

    return {
      bookedClass,
    };
  },
};
</script>
