<template>
  <div class="bookedClasses">
    <StudentBookedClass
      :bookedClasses="bookedClasses"
      :bookedClass="bookedClass"
    />
  </div>
</template>

<script>
import { useBookingLogic } from "@/composables/bookingLogic.js"; // Import the composable
import StudentBookedClass from "@/components/StudentBookedClass.vue";
import { onMounted, computed, ref } from "vue";
import { useClassesStore } from "@/store/classes.js";

export default {
  name: "RescheduleClass",
  components: {
    StudentBookedClass,
  },
  setup() {
    const store = useClassesStore();
    const { fetchBookedClasses } = useBookingLogic();
    const bookedClass = computed(() => {
      return store.getBookedClasses;
    });
    const bookedClasses = ref([]);

    onMounted(() => {
      fetchBookedClasses();
      const latestPosition = bookedClass.value.length - 1;
      bookedClasses.value = bookedClass.value[latestPosition];
    });

    return {
      bookedClass,
      bookedClasses,
    };
  },
};
</script>
