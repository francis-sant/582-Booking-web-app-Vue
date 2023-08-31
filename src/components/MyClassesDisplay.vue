<template>
  <div class="titulo">
    <div v-for="(item, index) of myClasses" :key="index" class="classesDisplay">
      <div class="schedule">
        <h3>Instructor: {{ item.instructor }}</h3>
        <p>Type of Class: {{ item.type }}</p>
        <p>Name of the Type of Class: {{ item.name }}</p>
        <p>Modality: {{ item.modality }}</p>
        <p>Duration: {{ item.duration }} minutes</p>

        <p>Date and Time:</p>
        <ul>
          <li v-for="(day, index) in item.dateTimes" :key="index">
            {{ day.date }} - {{ day.startTime }} até {{ day.endTime }}
          </li>
        </ul>

        <p>Price: R$ {{ item.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useTeacherStore } from "@/store/teacher.js";
// import { computed } from "vue";

export default {
  name: "MyClassesDisplay",

  computed: {
    myClasses() {
      const store = useTeacherStore();
      return store.getAvClasses;
    },
  },
};
</script>
