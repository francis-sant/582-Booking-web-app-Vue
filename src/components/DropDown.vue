<template>
  <div class="dropdown">
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
    <label for="time">Choose a Time:</label>
    <select
      id="time"
      v-model="selectedTime"
      @change="handleDropdownChange('time', selectedTime)"
    >
      <option v-for="(time, index) in availableTime" :key="index" :value="time">
        {{ time }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    availableClasses: Object,
    availableDate: Array,
    availableTime: Array,
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
  },
};
</script>

<style></style>
