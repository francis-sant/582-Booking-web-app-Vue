<template>
  <div class="home">
    <WelcomeBooking msg="Welcome to you Booking App" />
  </div>
</template>

<script>
import WelcomeBooking from "@/components/WelcomeBooking.vue";

export default {
  name: "HomeView",
  components: {
    WelcomeBooking,
  },
};
</script>
