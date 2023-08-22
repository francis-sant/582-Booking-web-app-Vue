<template>
  <div>
    <h2>Teacher classes</h2>
    <TeacherScheduleForm />
  </div>
  <div>
    <h1>Classes Available</h1>
    <div class="classesDisplay">
      <MyClassesDisplay
        v-for="item in myClasses"
        :key="item._id"
        :item="item"
      />
    </div>
  </div>
</template>

<script>
import TeacherScheduleForm from "@/components/TeacherScheduleForm.vue";
import { useItemsStore } from "@/store/index.js";
import MyClassesDisplay from "@/components/MyClassesDisplay.vue";

export default {
  components: {
    TeacherScheduleForm,
    MyClassesDisplay,
  },
  data() {
    return {
      myClasses: [],
    };
  },
  async created() {
    try {
      const store = useItemsStore(); // declaro a variavel para store e defino ela com a store que estou "chamando";
      this.myClasses = await store.fetchItems(); // Vou fazer o fecth dos items que estão na mongodb q vem atraves da store que quero e vou atribuir a variavel myItems q recebe como um empty array
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
