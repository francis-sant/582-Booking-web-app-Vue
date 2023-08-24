<template>
  <div>
    <label for="time">Escolha um horário:</label>
    <select id="time" v-model="selectedTime">
      <option v-for="time in availableTimes" :key="time">{{ time }}</option>
    </select>
  </div>

  <div>
    <h2>My Classes</h2>
    <ul>
      <li v-for="item in NewClass" :key="item._id">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
import { useClassesStore } from "@/store/classes.js";

export default {
  name: "StudentBooking",
  setup() {
    const classesStore = useClassesStore();
    const NewClass = classesStore.availableClasses;

    return {
      NewClass,
    };
  },

  data() {
    return {
      selectedTime: null,
    };
  },
  computed: {
    availableTimes() {
      const selectedClass = this.NewClass.find(
        (item) => item._id === this.selectedTime
      );
      const startTime = selectedClass ? selectedClass.startTime : 8; 
      const endTime = selectedClass ? selectedClass.endTime : 19; 
      const availableTimes = [];

      for (let hour = startTime; hour <= endTime; hour++) {
        availableTimes.push(this.formatHour(hour));
      }

      return availableTimes;
    },
  },
  methods: {
    formatHour(hour) {
      return hour > 12 ? `${hour - 12}pm` : `${hour}am`;
    },
  },
};
</script>
