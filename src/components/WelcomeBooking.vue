<template>
  <div class="homedesign">
    <h1>{{ msg }}</h1>
    <div class="homeauthentic">
      <div class="homeauthentic">
        <button @click="authenticateAndNavigate('instructor')">
          I'm an Instructor
        </button>
        <button @click="authenticateAndNavigate('student')">
          I'm a Student
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/store/authentication.js";

export default {
  name: "WelcomeBooking",
  props: {
    msg: String,
  },
  methods: {
    authenticateAndNavigate(role) {
      const authStore = useAuthStore();
      authStore.setRole(role);
      authStore.authenticate();

      if (role === "instructor") {
        this.$router.push("/services/booked");
      } else if (role === "student") {
        this.$router.push("/student/dashboard");
      }
    },
  },
};
</script>

<style lang="scss">
.homedesign {
  background: #fdfdfd;
  padding: 20px 0;

  h1 {
    text-align: center;
    font-size: 40px;
    font-weight: bold;
    color: rgb(0, 86, 112);
    padding: 3px;
  }

  .homeauthentic {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    button {
      margin: 10px;
      padding: 10px;
      border: 3px solid #a4fcc6;
      background-color: rgb(0, 86, 112);
      color: #a4fcc6;
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;

      &:hover {
        background-color: #a4fcc6;
        color: rgb(0, 86, 112);
      }
    }
  }
}
</style>
