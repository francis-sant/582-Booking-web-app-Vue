<template>
  <div>
    <nav>
      <router-link to="/student">Book My Class</router-link> |
      <router-link to="/student/reschedule">Booked Classes</router-link>|
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "StudentPage",
};
</script>
