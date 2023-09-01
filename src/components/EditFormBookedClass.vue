<template>
  <div class="editForm">
    <h3>Edit Class Information</h3>
    <form @submit.prevent="handleSubmit">
      <input data-testid="firstName" v-model="editableStudent.firstName" />
      <input data-testid="email" v-model="editableStudent.email" />

      <input
        data-testid="selectedTime"
        v-model="editableStudent.selectedTime"
      />

      <input
        data-testid="selectedDate"
        v-model="editableStudent.selectedDate"
        type="date"
      />

      <button type="submit">Save</button>
      <button data-testid="cancelbtn" type="cancel" @click="cancelEdit">
        Cancel
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  emits: ["save", "cancel"],
  props: {
    student: Object,
  },
  setup(props, { emit }) {
    const editableStudent = ref({ ...props.student });

    const handleSubmit = () => {
      emit("save", editableStudent.value);
      // console.log("editablevalue", editableStudent.value);
    };

    const cancelEdit = () => {
      emit("cancel");
      // console.log("cancel");
    };

    return {
      editableStudent,
      handleSubmit,
      cancelEdit,
    };
  },
};
</script>
