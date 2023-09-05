<template>
  <div>
    <h2>My Classes</h2>
    <div class="myclasses">
      <Dropdown
        :availableClasses="availableClasses"
        :availableDate="availableDate"
        :availableTime="availableTime"
        @change="handleDropdownChange"
      />
    </div>

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
    selectedClass.value = availableClasses.value[0];
    onMounted(async () => {
      selectedClass.value = availableClasses.value[0];
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
        console.log("time selected:", value);
        console.log("timeIsBooked:", selectedDate.value);
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
        return ["Select One Date First"];
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
      console.log("Booking details:", classDetails, studentInfo);

      // Save the booking details to a collection in the database
      try {
        const response = await fetch("http://localhost:3000/student/booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(combinedBookingDetails),
        });

        if (response.ok) {
          bookingConfirmed.value = true;
          bookingDetails.value = combinedBookingDetails;
          // const store = useClassesStore();
          // store.addBookedClass(combinedBookingDetails);
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
    };
  },
};
</script>
