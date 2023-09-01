<template>
  <!-- <router-link to="/">Go back</router-link> -->

  <div>
    <h2>Insert My Service</h2>
    <TeacherScheduleForm />
  </div>
  <div>
    <h1>My Available Services</h1>
    <div>
      <MyClassesDisplay />
    </div>
  </div>
</template>

<script>
import TeacherScheduleForm from "@/components/TeacherScheduleForm.vue";
import MyClassesDisplay from "@/components/MyClassesDisplay.vue";
import { computed } from "vue";
import { useClassesStore } from "@/store/classes.js";

export default {
  components: {
    TeacherScheduleForm,
    MyClassesDisplay,
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
