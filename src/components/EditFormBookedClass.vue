<template>
  <div>
    <h3>Edit Class Information</h3>
    <form @submit.prevent="handleSubmit">
      <input v-model="editableStudent.firstName" />
      <input v-model="editableStudent.email" />
      <input v-model="editableStudent.className" />
      <input v-model="editableStudent.selectedDate" />

      <select id="date" v-model="editableStudent.selectedDate"></select>

      <button type="submit" @click="saveChanges">Save</button>
      <button type="button" @click="cancelEdit">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    student: Object,
  },
  data() {
    return {
      editableStudent: { ...this.student },
    };
  },

  methods: {
    saveChanges() {
      // Implement logic to save the changes to the database
      // Update the selected student with edited data
      this.$emit("save", this.editableStudent);
    },
    handleSubmit() {
      // Get the updated data from the form and emit the save event
      const updatedStudent = { ...this.student /* updated fields */ };
      this.$emit("save", updatedStudent);
    },
    cancelEdit() {
      this.$emit("cancel");
    },
  },
};
</script>
