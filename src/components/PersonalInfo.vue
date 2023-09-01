<template>
  <div>
    <div class="personalinfo">
      <h2>My Contact Information</h2>
      <div class="personalForm">
        <label for="firstName">First Name:</label>
        <input id="firstName" v-model="firstName" required />

        <label for="lastName">Last Name:</label>
        <input id="lastName" v-model="lastName" required />

        <label for="phone">Phone:</label>
        <input id="phone" type="number" v-model="phone" required />

        <label for="email">Email:</label>
        <input id="email" v-model="email" required />
      </div>
      <button @click="confirmBooking" :disabled="isFormEmpty">
        Confirm Booking
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalInfo",
  props: {
    isFormInvalid: Boolean,
    bookingConfirmed: Boolean,
    studentInfo: Object,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    };
  },
  computed: {
    isFormEmpty() {
      return !this.firstName || !this.lastName || !this.phone || !this.email;
    },
  },
  methods: {
    confirmBooking() {
      if (!this.isFormEmpty) {
        this.$emit("booking-confirmed", {
          firstName: this.firstName,
          lastName: this.lastName,
          phone: this.phone,
          email: this.email,
        });
      }
    },
  },
};
</script>
