<template>
  <div class="titulo">
    <div class="schedule">
      <h3>Horário do Professor: {{ item.teacherName }}</h3>
      <p>Tipo de Aula: {{ item.typeOfClass }}</p>
      <p>Nome do Tipo de Aula: {{ item.typeOfClassName }}</p>
      <p>Mês: {{ item.selectedMonth }}</p>
      <p>Dias da Semana:</p>
      <ul>
        <li v-for="(day, index) in item.selectedDays" :key="index">
          {{ day }}
        </li>
      </ul>
      <p>Horário Disponível: {{ item.startTime }} até {{ item.endTime }}</p>
      <p>Preço: R$ {{ item.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
  },
};
</script>
