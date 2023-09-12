<template>
  <div class="dropdown" ref="dropdown">
    <label for="class">Choose a Class:</label>
    <select
      id="class"
      v-model="selectedClass"
      @change="handleDropdownChange('class', selectedClass)"
    >
      <option
        v-for="(classes, index) in availableClasses"
        :key="index"
        :value="classes"
      >
        {{ classes.name }}
      </option>
    </select>
    <label for="date">Choose a Date:</label>
    <select
      id="date"
      v-model="selectedDate"
      @change="handleDropdownChange('date', selectedDate)"
    >
      <option v-for="(date, index) in availableDate" :key="index" :value="date">
        {{ date }}
      </option>
    </select>
    <!-- <label for="time">Choose a Time:</label>
    <select
      id="time"
      v-model="selectedTime"
      @change="handleDropdownChange('time', selectedTime)"
    >
      <option v-for="(time, index) in availableTime" :key="index" :value="time">
        {{ time }}
      </option>
    </select> -->
    <div class="time-container">
      Available Time:
      <div
        v-for="(time, index) in availableTime"
        :key="index"
        @click="handleTimeClick(time)"
        :class="{ 'disabled-time': time === selectedTime }"
      >
        {{ time }}
      </div>
    </div>

    <!-- <button @click="resetFields">Reset</button> -->
  </div>
</template>

<script>
export default {
  props: {
    availableClasses: Object,
    availableDate: Array,
    availableTime: Array,
    isAlreadyBooked: Boolean,
  },
  data() {
    return {
      selectedClass: null,
      selectedDate: null,
      selectedTime: null,
    };
  },
  methods: {
    handleDropdownChange(type, value) {
      this.$emit("change", type, value);
    },

    handleTimeClick(time) {
      if (time !== this.selectedTime) {
        this.selectedTime = time;
        this.$emit("time-selected", time);
      }
    },

    resetFields() {
      this.selectedClass = null;
      this.selectedDate = null;
      this.selectedTime = null;

      this.$emit("reset-clicked");
    },
  },
};
</script>

<style scoped>
.time-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: start;
}

.time-container div {
  cursor: pointer;
  padding: 5px;
  margin: 5px;
  border: 2px solid #ffffff;
  color: #ffffff;
  border-radius: 5px;
}

.disabled-time {
  pointer-events: none;
  background-color: #cca702;
}
</style>
