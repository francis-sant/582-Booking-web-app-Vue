<template>
  <div class="titulo">
    <div v-for="item of myClasses" :key="item._id" class="classesDisplay">
      <div class="schedule">
        <h3>Horário do Professor: {{ item.instructor }}</h3>
        <p>Tipo de Aula: {{ item.type }}</p>
        <p>Nome do Tipo de Aula: {{ item.name }}</p>
        <p>Modality: {{ item.modality }}</p>
        <p>Mês: {{ getMonthName(item.month) }}</p>
        <p>Dias da Semana:</p>
        <ul>
          <li v-for="(day, index) in item.days" :key="index">
            {{ day }}
          </li>
        </ul>
        <div>{{ item.day }}</div>
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
      daysOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
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
  methods: {
    getMonthName(monthValue) {
      const months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
      ];
      return months[Number(monthValue) - 1];
    },
  },
};
</script>
