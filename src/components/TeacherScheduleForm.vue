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
    <fieldset>
      <legend>Date and Time Selection</legend>
      <div v-for="(dateTime, index) in dateTimes" :key="index">
        <label>Date:</label>
        <input type="date" v-model="dateTime.date" required />
        <label>Start Time:</label>
        <input type="time" v-model="dateTime.startTime" required />
        <label>End Time:</label>
        <input type="time" v-model="dateTime.endTime" required />
        <button @click="removeDateTime(index)">Remove</button>
      </div>
      <button @click="addDateTime">Add Date and Time</button>
    </fieldset>

    <label for="type">Duration - in minutes</label>
    <input type="text" v-model="duration" required />

    <!-- //add fields for breaks -->
    <label for="type">Breaks - in minutes</label>
    <input type="text" v-model="breaks" required />

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
import { useTeacherStore } from "@/store/teacher.js";
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
    const price = ref("");
    const modality = ref("");
    const selectedDays = ref([]);
    const successMessage = ref("");
    const failMessage = ref("");
    const duration = ref("");
    const breaks = ref("");

    const dateTimes = ref([{ date: "", startTime: "", endTime: "" }]);

    const addDateTime = () => {
      dateTimes.value.push({ date: "", startTime: "", endTime: "" });
    };

    const removeDateTime = (index) => {
      dateTimes.value.splice(index, 1);
    };

    // const teacherStore = useTeacherStore();
    const router = useRouter();

    const submitSchedule = async () => {
      const schedule = {
        instructor: instructor.value,
        type: type.value,
        name: name.value,
        modality: modality.value,
        price: price.value,
        duration: duration.value,
        dateTimes: dateTimes.value,
        breaks: breaks.value,
      };

      try {
        await fetch("http://localhost:3000/services", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(schedule),
        });
        console.log(schedule);

        const teacherstore = useTeacherStore();
        teacherstore.setAvClasses(schedule);
        successMessage.value = "Service Added Sucessfully!";

        clearForm();
        router.push("/services");
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
      price.value = "";
      selectedDays.value = [];
      duration.value = "";
      breaks.value = "";
    };

    return {
      instructor,
      name,
      type,
      modality,
      price,
      selectedDays,
      // isFormSubmitted,
      submitSchedule,
      successMessage,
      failMessage,
      duration,
      dateTimes,
      addDateTime,
      removeDateTime,
      breaks,
    };
  },
};
</script>
