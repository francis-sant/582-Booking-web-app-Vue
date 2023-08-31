<template>
  <div>
    <nav>
      <router-link to="/instructor/services">Insert My Services</router-link>
      <router-link to="/instructor/services/booked"
        >Booked Services</router-link
      >
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "InstructorPage",
};
</script>
