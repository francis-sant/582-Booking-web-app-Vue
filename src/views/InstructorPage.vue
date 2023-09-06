<template>
  <div>
    <nav>
      <!-- <router-view name="menu" /> -->
      <!-- <router-link to="/instructor">Home</router-link> | -->
      <router-link to="/instructor/booking">My Services</router-link> |
      <router-link to="/instructor/student/reschedule"
        >Students Booked</router-link
      >
      |
    </nav>
    <router-view />
  </div>
</template>
