<template>
  <div>
    <h3>Edit Class Information</h3>
    <form @submit.prevent="handleSubmit">
      <input v-model="editableStudent.firstName" />
      <input v-model="editableStudent.email" />
      <input v-model="editableStudent.className" />
      <input v-model="editableStudent.selectedDate" />

      <button type="submit">Save</button>
      <button type="button" @click="cancelEdit">Cancel</button>
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
      console.log("editablevalue", editableStudent.value);
    };

    const cancelEdit = () => {
      emit("cancel");
      console.log("cancel");
    };

    return {
      editableStudent,
      handleSubmit,
      cancelEdit,
    };
  },
};
</script>
