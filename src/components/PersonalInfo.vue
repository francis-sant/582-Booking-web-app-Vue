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
        <input
          id="email"
          type="email"
          v-model="email"
          required
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
          title="Please enter a valid email address."
          @input="validateEmail"
        />
      </div>
      <p v-if="emailValidationError" class="error-message">
        {{ emailValidationError }}
      </p>
      <button
        @click="confirmBooking"
        :disabled="isFormEmpty && emailValidationError"
      >
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
      emailValidationError: "",
    };
  },
  computed: {
    isFormEmpty() {
      return !this.firstName || !this.lastName || !this.phone || !this.email;
    },
  },
  methods: {
    validateEmail() {
      if (this.email === "") {
        this.emailValidationError = "Email is required.";
      } else {
        const emailPattern =
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(this.email)) {
          this.emailValidationError = "Please enter a valid email address.";
        } else {
          this.emailValidationError = "";
        }
      }
    },
    confirmBooking() {
      if (!this.isFormEmpty && !this.emailValidationError) {
        this.$emit("booking-confirmed", {
          firstName: this.firstName,
          lastName: this.lastName,
          phone: this.phone,
          email: this.email,
        });
      }
    },

    resetFields() {
      this.firstName = "";
      this.lastName = "";
      this.phone = "";
      this.email = "";
      this.emailValidationError = "";
    },
  },
  watch: {
    bookingConfirmed: function (newVal) {
      if (newVal === true) {
        this.resetFields();
      }
    },
  },
};
</script>

<style>
.error-message {
  color: red;
  margin-top: 5px;
  font-size: 14px;
}
</style>
