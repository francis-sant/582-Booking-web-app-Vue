<template>
  <div>
    <h2>Teacher classes</h2>
    <TeacherScheduleForm />
  </div>
  <div>
    <h1>Classes Available</h1>
    <div>
      <MyClassesDisplay />
    </div>
  </div>
</template>

<script>
import TeacherScheduleForm from "@/components/TeacherScheduleForm.vue";
import MyClassesDisplay from "@/components/MyClassesDisplay.vue";

export default {
  components: {
    TeacherScheduleForm,
    MyClassesDisplay,
  },
};
</script>
