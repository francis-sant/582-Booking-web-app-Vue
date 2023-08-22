<template>
  <form @submit.prevent="submitSchedule">
    <label for="teacher">Nome do Professor:</label>
    <input type="text" v-model="teachersName" required />

    <label for="type">Tipo de Aula:</label>
    <select v-model="typeOfClass" required>
      <option value="regular">Aulas Regulares</option>
      <option value="extra">Aulas Extras</option>
    </select>

    <label for="type">Nome do Tipo de Aula:</label>
    <input type="text" v-model="typeOfClassName" required />

    <label for="month">Mês:</label>
    <select v-model="selectedMonth" required>
      <option value="01">Janeiro</option>
      <option value="02">Fevereiro</option>
      <option value="03">Março</option>
      <option value="04">Abril</option>
      <option value="05">Maio</option>
      <option value="06">Junho</option>
      <option value="07">Julho</option>
      <option value="08">Agosto</option>
      <option value="09">Setembro</option>
      <option value="10">Outubro</option>
      <option value="11">Novembro</option>
      <option value="12">Dezembro</option>
    </select>

    <label>Dias da Semana:</label>
    <div>
      <label v-for="day in daysOfWeek" :key="day">
        <input type="checkbox" :value="day" v-model="selectedDays" />
        {{ day }}
      </label>
    </div>

    <label for="time">Horário Disponível:</label>
    <input type="time" v-model="startTime" required /> até
    <input type="time" v-model="endTime" required />

    <label for="price">Preço:</label>
    <input type="number" v-model="price" required />

    <button type="submit">Adicionar Minha Aula</button>

    <p v-if="isFormSubmitted" class="success-message">
      Formulário enviado com sucesso!
    </p>
  </form>
</template>

<script>
import { ref } from "vue";
import { useTeacherStore } from "@/store/teacher";
import { useRouter } from "vue-router";

export default {
  name: "TeacherScheduleForm",
  setup() {
    const teachersName = ref("");
    const typeOfClass = ref("");
    const typeOfClassName = ref("");
    const selectedMonth = ref("");
    const selectedDays = ref([]);
    const startTime = ref("");
    const endTime = ref("");
    const price = ref("");

    const isFormSubmitted = ref(false);

    const daysOfWeek = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];

    const teacherStore = useTeacherStore();
    const router = useRouter();

    const submitSchedule = () => {
      const schedule = {
        teachersName: teachersName.value,
        typeOfClass: typeOfClass.value,
        typeOfClassName: typeOfClassName.value,
        selectedMonth: selectedMonth.value,
        selectedDays: selectedDays.value,
        startTime: startTime.value,
        endTime: endTime.value,
        price: price.value,
      };
      teacherStore.addSchedule(schedule);

      isFormSubmitted.value = true;
      clearForm();

      router.push("/teacherclasses/booked");
    };

    const clearForm = () => {
      teachersName.value = "";
      typeOfClass.value = "";
      typeOfClassName.value = "";
      selectedMonth.value = "";
      selectedDays.value = [];
      startTime.value = "";
      endTime.value = "";
      price.value = "";
    };

    return {
      teachersName,
      typeOfClass,
      typeOfClassName,
      selectedMonth,
      selectedDays,
      startTime,
      endTime,
      price,
      daysOfWeek,
      isFormSubmitted,
      submitSchedule,
    };
  },
};
</script>
