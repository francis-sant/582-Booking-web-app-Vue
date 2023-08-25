<template>
  <div class="titulo">
    <div v-for="item of myClasses" :key="item._id" class="classesDisplay">
      <div class="schedule">
        <h3>Horário do Professor: {{ item.instructor }}</h3>
        <p>Tipo de Aula: {{ item.type }}</p>
        <p>Nome do Tipo de Aula: {{ item.name }}</p>
        <p>Modality: {{ item.modality }}</p>
        <p>Duration: {{ item.duration }} minutes</p>
        <p>Month:</p>
        <ul>
          <li v-for="(month, index) in item.months" :key="index">
            {{ month }}
          </li>
        </ul>
        <p>Dias da Semana:</p>
        <ul>
          <li v-for="(day, index) in item.days" :key="index">
            {{ day }}
          </li>
        </ul>

        <p>Horário Disponível: {{ item.startTime }} até {{ item.endTime }}</p>
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
