<template>
  <div>
    <h3>Edit Class Information</h3>
    <form @submit.prevent="handleSubmit">
      <input v-model="editableStudent.firstName" />
      <input v-model="editableStudent.email" />
      <input v-model="editableStudent.className" />
      <input v-model="editableStudent.selectedDate" />

      <select id="date" v-model="editableStudent.selectedDate"></select>

      <button type="submit" @click="handleSubmit">Save</button>
      <button type="button" @click="cancelEdit">Cancel</button>
    </form>
  </div>
  {{ editableStudent._id }}
</template>

<script>
export default {
  emits: ["save", "cancel"],
  props: {
    student: Object,
    selectedStudent: Object,
  },
  data() {
    return {
      editableStudent: { ...this.student },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const updatedStudent = {
          _id: this.editableStudent._id,
          firstName: this.editableStudent.firstName,
          email: this.editableStudent.email,
          className: this.editableStudent.className,
          selectedDate: this.editableStudent.selectedDate,
          // Add other fields as needed
        };

        const response = await fetch(
          `http://localhost:3000/classes/booking/${updatedStudent._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedStudent),
          }
        );

        if (response.ok) {
          this.$emit("save", updatedStudent);
        } else {
          // Handle error if needed
          console.error("Error updating student:", response.statusText);
        }
      } catch (error) {
        // Handle any other errors that might occur
        console.error("An error occurred:", error);
      }
    },
    cancelEdit() {
      this.$emit("cancel");
    },
  },
};
</script>
