<template>
  <div>
    <nav>
      <!-- <router-link to="/student">Book My Class</router-link> | -->
      <router-link to="/student/booking">Booking & Dashboard</router-link>|
    </nav>
    <router-view />

    <!-- <p>Qualquer coisa q eu escreva aqui, vai ta disponivel geral</p> -->
  </div>
</template>

<script>
import { computed } from "vue";
import { useClassesStore } from "@/store/classes.js";

export default {
  name: "StudentPage",

  setup() {
    const store = useClassesStore();
    const bookedClass = computed(() => store.getBookedClasses);

    return {
      bookedClass,
    };
  },
};
</script>
