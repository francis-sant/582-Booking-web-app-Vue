<template>
  <form @submit.prevent="submitSchedule">
    <label for="teacher">Instructor Name:</label>
    <input type="text" v-model="instructor" required />

    <label for="type">Type of Class:</label>
    <input type="text" v-model="type" required />

    <label for="type">Service Name </label>
    <input type="text" v-model="name" required />

    <label for="type">Modality: Online, Class</label>
    <input type="text" v-model="modality" required />

    <label for="month">Month:</label>
    <select v-model="month" required>
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

    <label for="frequency">Frequency:</label>
    <select v-model="selectedFrequency" id="frequency">
      <option value="once">Once</option>
      <option value="twice">Twice</option>
    </select>

    <label v-if="selectedFrequency === 'once'" for="dayOfWeek">
      Dia da semana (selecione um):
    </label>
    <div v-if="selectedFrequency === 'once'">
      <select v-model="selectedDay" id="dayOfWeek">
        <option v-for="(day, index) in daysOfWeek" :key="index" :value="day">
          {{ day }}
        </option>
      </select>
    </div>
    <!-- essa ocpção de selecionar apenas 2 dias é para o aluno -->
    <label v-if="selectedFrequency === 'twice'" for="dayOfWeek">
      Dias da semana (selecione dois):
    </label>
    <div v-if="selectedFrequency === 'twice'">
      <label v-for="(day, index) in daysOfWeek" :key="index">
        <input
          type="checkbox"
          :value="day"
          v-model="selectedDays"
          :disabled="selectedDays.length >= 2 && !selectedDays.includes(day)"
        />
        {{ day }}
      </label>
    </div>

    <label for="time">Available Time:</label>
    <input type="time" v-model="startTime" required /> até
    <input type="time" v-model="endTime" required />

    <label for="price">Price</label>
    <input type="number" v-model="price" required />

    <button type="submit">Adicionar Minha Aula</button>

    <div v-if="successMessage">
      {{ successMessage }}
    </div>
    <div v-else>
      {{ failMessage }}
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
// import { useTeacherStore } from "@/store/teacher";
import { useRouter } from "vue-router";

export default {
  name: "TeacherScheduleForm",

  computed: {
    selectedDaysCount() {
      return this.selectedDays.length;
    },
  },
  setup() {
    const instructor = ref("");
    const name = ref("");
    const type = ref("");
    const modality = ref("");
    const month = ref("");
    const selectedFrequency = ref("");
    const selectedDays = ref([]);
    const selectedDay = ref("");
    const startTime = ref("");
    const endTime = ref("");
    const price = ref("");
    const successMessage = ref("");
    const failMessage = ref("");

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // const teacherStore = useTeacherStore();
    const router = useRouter();

    const submitSchedule = async () => {
      const schedule = {
        instructor: instructor.value,
        type: type.value,
        name: name.value,
        modality: modality.value,
        frequency: selectedFrequency.value,
        month: month.value,
        days: selectedDays.value,
        day: selectedDay.value,
        startTime: startTime.value,
        endTime: endTime.value,
        price: price.value,
      };

      try {
        await fetch("http://localhost:3000/services/teacher", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(schedule),
        });

        successMessage.value = "Service Added Sucessfully!";
        clearForm();
        router.push("/services/teacher");
      } catch (error) {
        failMessage.value = "Your Request Failed!" + error;
        console.error(error);
      }
    };

    const clearForm = () => {
      instructor.value = "";
      name.value = "";
      type.value = "";
      modality.value = "";
      month.value = "";
      selectedFrequency.value = "";
      selectedDay.value = "";
      startTime.value = "";
      endTime.value = "";
      price.value = "";
      selectedDays.value = [];
    };

    return {
      instructor,
      name,
      type,
      modality,
      month,
      selectedFrequency,
      selectedDay,
      startTime,
      endTime,
      price,
      daysOfWeek,
      selectedDays,
      // isFormSubmitted,
      submitSchedule,
      successMessage,
      failMessage,
    };
  },
};
</script>
