<template>
  <div>
    <h2>Student Class Dashboard</h2>
    <div
      v-for="(student, index) in bookedClass[0]"
      :key="index"
      class="student-details"
    >
      <h3>My Classes Information</h3>
      <p>First Name: {{ student.firstName }}</p>
      <p>Email: {{ student.email }}</p>
      <p>Class Name: {{ student.className }}</p>
      <p>Selected Date: {{ student.selectedDate }}</p>
      <p>Selected Time: {{ student.selectedTime }}</p>
     
      <button @click="editBooking(student)">Edit</button>
      <hr />
    </div>
  </div>
  <EditFormBookedClass
    v-if="selectedStudent"
    :student="selectedStudent"
    @save="updateStudentClass"
    @cancel="selectedStudent = null"
  />
</template>

<script>
import { useClassesStore } from "@/store/classes.js";
import EditFormBookedClass from "@/components/EditFormBookedClass.vue";

import { ref } from "vue";

export default {
  components: {
    EditFormBookedClass,
  },
  setup() {
    const bookedClass = ref([]);
    const editableFields = ref({});
    const store = useClassesStore();
    bookedClass.value = store.getBookedClasses;
    console.log("bookedclass", bookedClass.value);

    const cancelClass = (student) => {
            console.log("Canceling class for:", student);
    };

    const editField = (studentId) => {
      if (!editableFields.value[studentId]) {
        editableFields.value[studentId] = {};
      }
      for (const field in bookedClass.value[0][studentId]) {
        editableFields.value[studentId][field] = true;
      }
    };

    const getEditableField = (student, field, studentId) => {
      if (
        editableFields.value[studentId] &&
        editableFields.value[studentId][field]
      ) {
        return student[field];
      }
    };

    return {
      bookedClass,
      cancelClass,
      editField,
      getEditableField,
    };
  },
  methods: {
    editBooking(bookingDetails) {
      this.$emit("edit-booking", bookingDetails);
    },
  },
};
</script>
