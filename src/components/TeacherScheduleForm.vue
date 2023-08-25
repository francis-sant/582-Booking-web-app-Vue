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

    <div class="months" for="months">
      <h2>Months:</h2>
      <label v-for="(monthLabel, monthValue) in months" :key="monthValue">
        <input type="checkbox" :value="monthLabel" v-model="selectedMonths" />
        {{ monthLabel }}
      </label>
    </div>

    <label for="frequency">Frequency:</label>
    <select v-model="selectedFrequency" id="frequency">
      <option value="once">Once</option>
      <option value="twice">Twice</option>
      <option value="daily">Daily</option>
    </select>

    <div
      v-if="selectedFrequency === 'once' || selectedFrequency === 'twice'"
      for="dayOfWeek"
    >
      <label>Dia da semana:</label>
      <label v-for="(day, index) in daysOfWeek" :key="index" value="day">
        <input type="checkbox" :value="day" v-model="selectedDays" />
        {{ day }}
      </label>
    </div>
    <div v-if="selectedFrequency === 'daily'" for="dayOfWeek">
      <label>Dia da semana:</label>
      <label v-for="(day, index) in daysOfWeek" :key="index" value="day">
        <input type="checkbox" :value="day" v-model="selectedDays" />
        {{ day }}
      </label>
    </div>

    <label for="type">Duration - in minutes</label>
    <input type="text" v-model="duration" required />

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
    const selectedFrequency = ref("");
    const selectedDays = ref([]);
    const startTime = ref("");
    const endTime = ref("");
    const price = ref("");
    const successMessage = ref("");
    const failMessage = ref("");
    const selectedMonths = ref([]);
    const duration = ref("");

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const months = {
      "01": "Janeiro",
      "02": "Fevereiro",
      "03": "Março",
      "04": "Abril",
      "05": "Maio",
      "06": "Junho",
      "07": "Julho",
      "08": "Agosto",
      "09": "Setembro",
      10: "Outubro",
      11: "Novembro",
      12: "Dezembro",
    };

    // const teacherStore = useTeacherStore();
    const router = useRouter();

    const submitSchedule = async () => {
      const schedule = {
        instructor: instructor.value,
        type: type.value,
        name: name.value,
        modality: modality.value,
        frequency: selectedFrequency.value,
        months: selectedMonths.value,
        days: selectedDays.value,
        startTime: startTime.value,
        endTime: endTime.value,
        price: price.value,
        duration: duration.value,
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
      months.value = "";
      selectedMonths.value = [];
      selectedFrequency.value = "";
      startTime.value = "";
      endTime.value = "";
      price.value = "";
      selectedDays.value = [];
      duration.value = "";
    };

    return {
      instructor,
      name,
      type,
      modality,
      months,
      selectedMonths,
      selectedFrequency,
      startTime,
      endTime,
      price,
      daysOfWeek,
      selectedDays,
      // isFormSubmitted,
      submitSchedule,
      successMessage,
      failMessage,
      duration,
    };
  },
};
</script>
