<template>
  <div>
    <h2>My Classes</h2>
    <div class="myclasses">
      <label for="class">Choose a Class:</label>
      <select id="class" v-model="selectedClass">
        <option
          v-for="classItem in availableClasses"
          :key="classItem._id"
          :value="classItem"
        >
          {{ classItem.name }}
        </option>
      </select>
      <label for="date">Choose a Date:</label>
      <select id="date" v-model="selectedDate">
        <option
          v-for="(time, index) in availableDate"
          :key="index"
          :value="time"
        >
          {{ time }}
        </option>
      </select>

      <label for="time">Choose a Time:</label>
      <select id="time" v-model="selectedTime">
        <option
          v-for="(time, index) in availableTime"
          :key="index"
          :value="time"
          :disabled="isAlreadyBooked"
        >
          {{ time }}
        </option>
      </select>
    </div>
    <div v-if="validationMessage" id="validationmsg">
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
import { useRouter } from "vue-router";
import PersonalInfo from "./PersonalInfo.vue";

export default {
  name: "StudentBooking",
  components: {
    PersonalInfo,
  },
  setup() {
    const classesStore = useClassesStore();
    const availableClasses = computed(() => classesStore.getAvClasses);
    const selectedClass = ref(null);
    const selectedDate = ref(null);
    const firstName = ref("");
    const lastName = ref("");
    const phone = ref("");
    const email = ref("");
    const bookingConfirmed = ref(false);
    const validationMessage = ref("");
    const bookingDetails = ref(null);
    const selectedTime = ref(null);
    const studentInfo = ref({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    });

    const router = useRouter();

    const availableDate = computed(() => {
      if (!selectedClass.value) {
        return ["No Class Yet"];
      }
      // Get the selected class's dateTimes array
      const classDateTimes = selectedClass.value.dateTimes;

      // Extract the dates from the classDateTimes array
      const dates = classDateTimes.map((dateTime) => dateTime.date);

      return dates;
    });

    const availableTime = computed(() => {
      if (!selectedClass.value || !selectedDate.value) {
        return ["Select a Class first"];
      } else {
        const selectedDateValue = selectedDate.value;
        const dateTimes = selectedClass.value.dateTimes;

        let selectedDateTime = null;
        for (let i = 0; i < dateTimes.length; i++) {
          if (dateTimes[i].date === selectedDateValue) {
            selectedDateTime = dateTimes[i];
            let startTime = selectedDateTime.startTime;
            let endTime = selectedDateTime.endTime;

            const availableHours = [];
            const startHour = parseInt(startTime.split(":")[0]);
            const endHour = parseInt(endTime.split(":")[0]);

            for (let hour = startHour; hour <= endHour; hour++) {
              availableHours.push(`${hour}:00`);
            }

            return availableHours;
          }
        }

        if (selectedDateTime) {
          return [selectedDateTime.startTime, selectedDateTime.endTime];
        } else {
          return ["No Available Times for Selected Date"];
        }
      }
    });

    //now i need to send and take booked classes from the store to check new availtime slots

    // const router = useRouter();

    const fetchBookedClasses = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/classes/booking/bookedclasses"
        );
        if (response.ok) {
          const bookedClass = await response.json();
          // bookedClasses.value = bookedClass; // Store fetched booked classes
          const classesStore = useClassesStore();
          classesStore.addBookedClass(bookedClass);

          const bookedClassDetails = bookedClass.map((bookedClass) => {
            return {
              firstName: bookedClass.firstName,
              email: bookedClass.email,
              selectedTime: bookedClass.selectedTime,
              selectedDays: bookedClass.selectedDays,
              selectedClass: bookedClass.class.name,
              duration: bookedClass.class.duration,
            };
          });
          classesStore.setBookedTimeSlots(bookedClassDetails);
        } else {
          console.error("Failed to fetch booked classes:", response.statusText);
        }
      } catch (error) {
        console.error("Error while fetching booked classes:", error);
      }
    };

    onMounted(async () => {
      // choosing a default to be already available in the menu offer
      selectedClass.value = availableClasses.value[0];
      fetchBookedClasses();
    });

    const isAlreadyBooked = computed(() => {
      const selectedClassName = selectedClass.value?.name; // Safely access the property
      const selectedDateValue = selectedDate.value;
      const selectedTimeValue = selectedTime.value;

      const classesStore = useClassesStore();

      const bookedClasses = classesStore.getBookedClasses;

      console.log("Booked classes:", bookedClasses);
      return bookedClasses.some((booking) => {
        return (
          booking.selectedClass === selectedClassName &&
          booking.selectedDate === selectedDateValue &&
          booking.selectedTime === selectedTimeValue
        );
      });
    });

    // const validateForm = () => {
    //   // Validation logic
    //   // ...
    // };

    // const isFormInvalid = computed(() => {
    //   return validateForm();
    // });

    // const confirmBooking = async () => {
    //   // Confirm booking logic
    //   // ...
    // };

    // const isFormInvalid = computed(() => {
    //   console.log("Form checking is being accessed.");
    //   return validateForm();
    // });

    const sendBooking = async (studentInfo) => {
      // Handle the booking details emitted from the child component

      const classDetails = {
        className: selectedClass.value.name,
        classType: selectedClass.value.type,
        duration: selectedClass.value.duration,
        selectedDate: selectedDate.value,
        selectedTime: selectedTime.value,
        instructor: selectedClass.value.instructor,
      };

      // Combine personalInfo and classDetails into a single object
      const combinedBookingDetails = {
        ...studentInfo,
        ...classDetails,
      };
      console.log("Booking details:", classDetails, studentInfo);

      // Save the booking details to a collection or store as needed
      try {
        const response = await fetch("http://localhost:3000/classes/booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(combinedBookingDetails),
        });

        if (response.ok) {
          bookingConfirmed.value = true; // Update bookingConfirmed here if needed
          bookingDetails.value = combinedBookingDetails;

          router.push("/classes");
          // Update studentInfo with the confirmed booking student information
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
    };
  },
};
</script>
