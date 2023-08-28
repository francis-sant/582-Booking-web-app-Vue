<template>
  <div>
    <div class="personalinfo">
      <h2>My Contact Information</h2>
      <label for="firstName">First Name:</label>
      <input id="firstName" v-model="firstName" required />

      <label for="lastName">Last Name:</label>
      <input id="lastName" v-model="lastName" required />

      <label for="phone">Phone:</label>
      <input id="phone" v-model="phone" required />

      <label for="email">Email:</label>
      <input id="email" v-model="email" required />
    </div>

    <button @click="confirmBooking">Confirm Booking</button>

    <!-- <div class="personalConfirmation">
      <h2>Confirmation</h2>
      <p>FullName: {{ firstName }} {{ lastName }}</p>
      <p>Phone: {{ phone }}</p>
      <p>Email: {{ email }}</p>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "PersonalInfo",
  props: {
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
  methods: {
    confirmBooking() {
      // const studentInfo = {
      //   firstName: this.firstName,
      //   lastName: this.lastName,
      //   phone: this.phone,
      //   email: this.email,
      // };

      // const classDetails = {
      //   className: this.selectedClass.name,
      //   classType: this.selectedClass.type,
      //   duration: this.selectedClass.duration,
      //   selectedDate: this.dateTimes.dateTimes,
      //   selectedTime: this.dateTimes.dateTimes[0],
      // };

      // Emit an event to the parent component with booking details
      this.$emit("booking-confirmed", {
        firstName: this.firstName,
        lastName: this.lastName,
        phone: this.phone,
        email: this.email,
      });
    },
  },
};
</script>
