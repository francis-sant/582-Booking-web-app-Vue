<template>
  <div>
    <h1>Book My Class</h1>
    <StudentBooking />
    <!-- <h1>My Booked Classes</h1>
    <StudentBookedClass :bookedClasses="bookedClass[0]" /> -->
  </div>
</template>

<script>
import StudentBooking from "@/components/StudentBooking.vue";
// import StudentBookedClass from "@/components/StudentBookedClass.vue";
import { computed } from "vue";
import { useClassesStore } from "@/store/classes.js";

export default {
  name: "ClassesAvailable",
  components: {
    StudentBooking,
    // StudentBookedClass,
  },
  setup() {
    const store = useClassesStore();
    const bookedClass = computed(() => store.getBookedClasses);

    return {
      bookedClass,
    };
  },
};
</script>

<style lang="scss"></style>
