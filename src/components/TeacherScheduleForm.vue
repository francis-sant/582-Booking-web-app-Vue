<template>
  <form class="insertForm" @submit.prevent="submitSchedule">
    <label for="teacher">Instructor Name:</label>
    <input type="text" v-model="instructor" required id="teacher" />

    <label for="type">Type of Class:</label>
    <input type="text" v-model="type" id="type" required />

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
        <button @click="addDateTime">Add Date and Time</button>
      </div>
    </fieldset>

    <label for="type">Duration - in minutes</label>
    <input type="number" v-model="duration" required />

    <!-- //add fields for breaks -->
    <label for="type">Breaks - in minutes</label>
    <input type="number" v-model="breaks" required />

    <label for="price">Price</label>
    <input type="number" v-model="price" required />

    <button type="submit">Add My Service</button>

    <div class="successMessage" v-if="successMessage">
      {{ successMessage }}
    </div>
    <div v-else>
      {{ failMessage }}
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useTeacherStore } from "@/store/teacher.js";

export default {
  name: "TeacherScheduleForm",

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

    // // const teacherStore = useTeacherStore();
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
        await fetch(
          "https://cautious-goldfish-44j4rv5xwv5hg66-3000.app.github.dev/services/booked",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(schedule),
          }
        );
        console.log(schedule);
        const store = useTeacherStore();
        store.addBookedClass(schedule);
        successMessage.value = "Service Added Sucessfully!";
        router.push("/services/booked");
        clearForm();
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

<style lang="scss">
.insertForm {
  background: rgb(0, 86, 112);
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto;
  margin-bottom: 20px;
  max-width: 645px;
  font-size: 18px;
  color: white;

  label,
  input {
    margin-bottom: 10px;
  }

  fieldset {
    margin-bottom: 10px;
  }

  .successMessage {
    color: #22e14b;
    background: #000000;
    width: 50%;
    margin: auto;
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
