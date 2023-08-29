<template>
  <div class="titulo">
    <div v-for="item of myClasses" :key="item._id" class="classesDisplay">
      <div class="schedule">
        <h3>Instructor: {{ item.instructor }}</h3>
        <p>Tipo de Aula: {{ item.type }}</p>
        <p>Nome do Tipo de Aula: {{ item.name }}</p>
        <p>Modality: {{ item.modality }}</p>
        <p>Duration: {{ item.duration }} minutes</p>

        <p>Date and Time:</p>
        <ul>
          <li v-for="(day, index) in item.dateTimes" :key="index">
            {{ day.date }} - {{ day.startTime }} até {{ day.endTime }}
          </li>
        </ul>

        <p>Preço: R$ {{ item.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useTeacherStore } from "@/store/teacher.js";
import { computed } from "vue";

export default {
  setup() {
    // const myClasses = ref([]);

    const store = useTeacherStore();
    const myClasses = computed(() => store.getAvClasses);
    // myClasses.value = teacher.value;

    return {
      myClasses,
    };
  },
};
</script>
