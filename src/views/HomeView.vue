<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <WelcomeBooking msg="Welcome to you Booking App" />
  </div>
</template>

<script>
// @ is an alias to /src
import WelcomeBooking from "@/components/WelcomeBooking.vue";

export default {
  name: "HomeView",
  components: {
    WelcomeBooking,
  },
};
</script>
