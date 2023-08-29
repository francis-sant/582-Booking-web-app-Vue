<template>
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

export default {
  components: {
    TeacherScheduleForm,
    MyClassesDisplay,
  },
};
</script>
