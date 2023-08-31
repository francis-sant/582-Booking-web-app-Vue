<template>
  <div class="homeauthentic">
    <h1>Welcome to the App</h1>
    <button @click="navigateTo('instructor')">I am an Instructor</button>
    <button @click="navigateTo('student')">I am a Student</button>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo(role) {
      this.$router.push(`/${role}`);
    },
  },
};
</script>
