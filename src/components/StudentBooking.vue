<template>
  <div class="bookingclass">
    <h2>My Classes</h2>
    <div class="myclasses">
      <Dropdown
        ref="dropdown"
        :availableClasses="availableClasses"
        :availableDate="availableDate"
        :availableTime="availableTime"
        @change="handleDropdownChange"
        @time-selected="handleTimeSelected"
      />
    </div>

    <button @click="resetDropdown">Start Over My Booking</button>

    <div class="validationMessage">
      {{ validationMessage }}
    </div>

    <div class="classInfo" v-if="selectedClass">
      <p>Instructor: {{ selectedClass.instructor }}</p>
      <p>Type: {{ selectedClass.type }}</p>
      <p>Modality: {{ selectedClass.modality }}</p>
      <p>Duration: {{ selectedClass.duration }} minutes</p>
      <p>Price: $ {{ selectedClass.price }}</p>
    </div>

    <PersonalInfo
      ref="personalinfo"
      :isFormInvalid="isFormEmpty"
      :student-info="studentInfo"
      @booking-confirmed="sendBooking"
    />

    <div class="classbooked" v-if="bookingConfirmed">
      <h2>Class Booked</h2>
      <p>
        Student Name: {{ bookingDetails.firstName }}
        {{ bookingDetails.lastName }}
      </p>

      <p>Class Name: {{ bookingDetails.className }}</p>
      <p>Class Type: {{ bookingDetails.classType }}</p>
      <p>Duration: {{ bookingDetails.duration }} minutes</p>
      <p>Date: {{ bookingDetails.selectedDate }}</p>
      <p>Time: {{ bookingDetails.selectedTime }}</p>
    </div>
  </div>
</template>

<script>
import { useClassesStore } from "@/store/classes.js";
import { ref, computed, onMounted } from "vue";
// import { useRouter } from "vue-router";
import PersonalInfo from "./PersonalInfo.vue";
import Dropdown from "@/components/DropDown.vue";
import { useBookingLogic } from "@/composables/bookingLogic.js"; // Import the composable

export default {
  name: "StudentBooking",
  components: {
    PersonalInfo,
    Dropdown,
  },
  methods: {
    resetDropdown() {
      this.selectedClass = "";
      this.selectedDate = "";
      this.selectedTime = null;
      this.$refs.personalinfo.resetFields();
      this.$refs.dropdown.resetFields();
    },
  },
  setup() {
    const {
      fetchBookedClasses,
      timeIsBooked,
      calculateAvailableTimeSlots,
      checkBookingAvailability,
    } = useBookingLogic();
    const classesStore = useClassesStore();
    const availableClasses = computed(() => classesStore.getAvClasses);
    const selectedClass = ref(null);
    const selectedDate = ref(null);
    const selectedTime = ref(null);
    const firstName = ref("");
    const lastName = ref("");
    const phone = ref("");
    const email = ref("");
    const bookingConfirmed = ref(false);
    const validationMessage = ref("");
    const bookingDetails = ref(null);
    const isRescheduled = ref(false);

    const isAlreadyBooked = ref(false);
    const studentInfo = ref({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    });

    // const router = useRouter();
    // selectedClass.value = availableClasses.value[0];
    onMounted(async () => {
      // selectedClass.value = availableClasses.value[0];
      fetchBookedClasses();
    });

    // ----------------------------------------------------------------------
    const handleDropdownChange = (type, value) => {
      if (type === "class") {
        selectedClass.value = value;
        selectedDate.value = null;
        selectedTime.value = null;
      } else if (type === "date") {
        selectedDate.value = value;
        selectedTime.value = null;
      } else if (type === "time") {
        // console.log("time selected:", value);
        // console.log("timeIsBooked:", selectedDate.value);
        selectedTime.value = value;
      }

      const bookingAvailability = checkBookingAvailability(
        selectedClass.value,
        selectedDate.value,
        selectedTime.value
      );
      if (bookingAvailability.isAlreadyBooked) {
        validationMessage.value = bookingAvailability.validationMessage;
      } else {
        validationMessage.value = "";
      }
    };

    const handleTimeSelected = (time) => {
      // Perform the time booking availability check
      const bookingAvailability = checkBookingAvailability(
        selectedClass.value,
        selectedDate.value,
        time
      );

      if (bookingAvailability.isAlreadyBooked) {
        validationMessage.value = bookingAvailability.validationMessage;
        selectedTime.value = null;
        isAlreadyBooked.value = true;
        // console.log("time booked:", isAlreadyBooked.value);
      } else {
        selectedTime.value = time;
        validationMessage.value = "";
        isAlreadyBooked.value = false;
        // console.log("time booked:", isAlreadyBooked.value);
      }
    };
    // ------------------------------------------------------------------------
    const availableDate = computed(() => {
      if (!selectedClass.value) {
        return ["Please Select One Class First"];
      }
      const classDateTimes = selectedClass.value.dateTimes;

      const dates = classDateTimes.map((dateTime) => dateTime.date);

      return dates;
    });

    const availableTime = computed(() => {
      if (selectedDate.value && selectedClass.value) {
        // Handle the case where a date is already selected
        const availableTimes = calculateAvailableTimeSlots(
          selectedClass.value,
          selectedDate.value,
          selectedTime.value
        );
        return availableTimes;
      } else {
        // Handle the default case where no date is selected
        return ["Please choose a Class & Date first"];
      }
    });

    // -----------------------------------------------------------------------
    const isFormEmpty = computed(() => {
      return (
        !selectedClass.value ||
        !selectedDate.value ||
        !selectedTime.value ||
        !firstName.value ||
        !lastName.value ||
        !phone.value ||
        !email.value
      );
    });

    const sendBooking = async (studentInfo) => {
      const classDetails = {
        className: selectedClass.value.name,
        classType: selectedClass.value.type,
        duration: selectedClass.value.duration,
        selectedDate: selectedDate.value,
        selectedTime: selectedTime.value,
        instructor: selectedClass.value.instructor,
        isRescheduled: isRescheduled.value,
      };

      // Combining personalInfo and classDetails into a single object
      const combinedBookingDetails = {
        ...studentInfo,
        ...classDetails,
      };
      // console.log("Booking details:", classDetails, studentInfo);

      // Save the booking details to a collection in the database
      try {
        const response = await fetch(
          "https://cautious-goldfish-44j4rv5xwv5hg66-3000.app.github.dev/student/booking",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(combinedBookingDetails),
          }
        );

        if (response.ok) {
          bookingConfirmed.value = true;
          bookingDetails.value = combinedBookingDetails;
          const store = useClassesStore();
          store.addBookedClass(combinedBookingDetails);
          // router.push("/student/booking");
          await fetchBookedClasses();
        } else {
          console.error("Booking request failed:", response.statusText);
        }
      } catch (error) {
        console.error("Booking request error:", error);
      }
    };

    return {
      availableClasses,
      selectedClass,
      selectedDate,
      firstName,
      lastName,
      phone,
      email,
      bookingConfirmed,
      bookingDetails,
      validationMessage,
      selectedTime,
      availableDate,
      availableTime,
      studentInfo,
      sendBooking,
      isAlreadyBooked,
      checkBookingAvailability,
      handleDropdownChange,
      isRescheduled,
      timeIsBooked,
      isFormEmpty,
      handleTimeSelected,
    };
  },
};
</script>
