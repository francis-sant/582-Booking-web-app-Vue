<template>
  <div class="titulo">
    <div v-for="item of myClasses" :key="item._id" class="classesDisplay">
      <div class="schedule">
        <h3>Horário do Professor: {{ item.instructor }}</h3>
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
import { useItemsStore } from "@/store/index.js";

export default {
  data() {
    return {
      myClasses: [],
    };
  },
  async created() {
    try {
      const store = useItemsStore();
      this.myClasses = await store.fetchItems();
    } catch (error) {
      console.error(error);
    }
  },
  methods: {},
};
</script>
