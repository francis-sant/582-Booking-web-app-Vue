<template>
  <div>
    <h2>My Classes</h2>
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
    <!-- using two way binding im binding the availableclasses data from pinia to selectedClass and passing along to new variables to save them as a new form for the studentclasses booked -->
    <label for="time">Choose a Time:</label>
    <select id="time" v-model="selectedTime">
      <option v-for="time in availableTimes" :key="time">{{ time }}</option>
    </select>

    <div v-if="selectedClass">
      <div v-if="selectedClass.frequency === 'once'">
        <label for="selectedDays"> Dia da semana: </label>
        <div v-if="selectedClass.frequency === 'once'">
          <label v-for="(day, index) in availableDays" :key="index" required>
            <input
              id="selectedDays"
              type="checkbox"
              :value="day"
              v-model="selectedDays"
              :disabled="
                selectedDays.length >= 1 && !selectedDays.includes(day)
              "
            />
            {{ day }}
          </label>
        </div>
      </div>

      <div v-else-if="selectedClass.frequency === 'twice'">
        <label for="selectedDays">Choose Two Days:</label>
        <div>
          <label v-for="(day, index) in availableDays" :key="index">
            <input
              id="selectedDays"
              type="checkbox"
              :value="day"
              v-model="selectedDays"
              :disabled="
                selectedDays.length >= 2 && !selectedDays.includes(day)
              "
            />
            {{ day }}
          </label>
        </div>
      </div>
      <label for="selectedMonth">Choose a Month:</label>
      <select id="selectedMonth" v-model="selectedMonth" required>
        <option v-for="month in selectedClass.months" :key="month">
          {{ month }}
        </option>
      </select>

      <p>Type: {{ selectedClass.type }}</p>
      <p>Frequency: {{ selectedClass.frequency }}</p>
      <p>Modality: {{ selectedClass.modality }}</p>
      <p>Duration: {{ selectedClass.duration }} minutes</p>
      <p>Price: $ {{ selectedClass.price }}</p>
    </div>

    <div v-if="validationMessage" id="validationmsg">
      {{ validationMessage }}
    </div>

    <div class="personalinfo">
      <h2>Personal Information</h2>
      <label for="firstName">First Name:</label>
      <input id="firstName" v-model="firstName" required />

      <label for="lastName">Last Name:</label>
      <input id="lastName" v-model="lastName" required />

      <label for="phone">Phone:</label>
      <input id="phone" v-model="phone" required />

      <label for="email">Email:</label>
      <input id="email" v-model="email" required />
    </div>

    <button @click="confirmBooking" :disabled="isFormInvalid">
      Confirm Booking
    </button>

    <div v-if="bookingConfirmed">
      <h2>Confirmation</h2>
      <p>Name: {{ firstName }} {{ lastName }}</p>
      <p>Phone: {{ phone }}</p>
      <p>Email: {{ email }}</p>
      <p>Class: {{ selectedClass.name }}</p>
      <p>Type: {{ selectedClass.type }}</p>
      <p>Time: {{ selectedTime }}</p>
      <p>Duration: {{ selectedClass.duration }}</p>
    </div>

    <div v-else>
      <p>No New Classes Booked Yet!</p>
    </div>
  </div>
</template>

<script>
import { useClassesStore } from "@/store/classes.js";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "StudentBooking",
  computed: {
    selectedDaysCount() {
      return this.selectedDays.length;
    },
  },
  setup() {
    const classesStore = useClassesStore();
    const availableClasses = computed(() => classesStore.getAvClasses);
    const selectedClass = ref(null);
    const selectedTime = ref(null);
    const firstName = ref("");
    const lastName = ref("");
    const phone = ref("");
    const email = ref("");
    const bookingConfirmed = ref(false);
    const selectedMonth = ref("");
    const selectedDays = ref([]);
    const validationMessage = ref("");

    //now i need to send and take booked classes from the store to check new availtime slots
    const bookedClasses = ref([]);

    const availableDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const router = useRouter();

    const fetchBookedClasses = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/classes/booking/bookedclasses"
        );
        if (response.ok) {
          const bookedClass = await response.json();
          bookedClasses.value = bookedClass; // Store fetched booked classes
          const classesStore = useClassesStore();
          classesStore.addBookedClass(bookedClass);
          const bookedTimeSlots = bookedClass.map((bookedClass) => {
            return bookedClass.time;
          });
          classesStore.setBookedTimeSlots(bookedTimeSlots);

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

    const availableTimes = computed(() => {
      if (!selectedClass.value) {
        return [];
      }

      const { startTime, endTime } = selectedClass.value;
      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = endTime.split(":").map(Number);

      const times = [];

      for (let hour = startHour; hour <= endHour; hour++) {
        for (let minute = 0; minute <= 59; minute++) {
          if (
            (hour === startHour && minute >= startMinute) ||
            (hour === endHour && minute <= endMinute) ||
            (hour !== startHour && hour !== endHour)
          ) {
            times.push(formatHourMinute(hour, minute));
          }
        }
      }

      return times;
    });

    const formatHourMinute = (hour, minute) => {
      const period = hour >= 12 ? "pm" : "am";
      const formattedHour = hour > 12 ? hour - 12 : hour;
      const formattedMinute = String(minute).padStart(2, "0");
      return `${formattedHour}:${formattedMinute}${period}`;
    };

    // const isFormInvalid = computed(() => {
    //   console.log("isFormInvalid being entered");

    //   return (
    //     !selectedClass.value ||
    //     !selectedTime.value ||
    //     !selectedDays.value ||
    //     !firstName.value ||
    //     !lastName.value ||
    //     !phone.value ||
    //     !email.value
    //   );
    // });

    const validateForm = () => {
      validationMessage.value = "";
      if (selectedClass.value && selectedTime.value) {
        if (
          selectedClass.value.frequency === "once" &&
          selectedDays.value.length === 0
        ) {
          validationMessage.value = "Please select One day of the week.";
          return true;
        } else if (
          selectedClass.value.frequency === "twice" &&
          selectedDays.value.length !== 2
        ) {
          validationMessage.value = "Please select Two days of the week.";
          return true;
        } else {
          return (
            !selectedClass.value ||
            !selectedTime.value ||
            !selectedDays.value ||
            !firstName.value ||
            !lastName.value ||
            !phone.value ||
            !email.value
          );
        }
      }
      validationMessage.value = "Don't forget to select a class and time.";
      return (
        !selectedClass.value ||
        !selectedTime.value ||
        !selectedDays.value ||
        !firstName.value ||
        !lastName.value ||
        !phone.value ||
        !email.value
      );
    };

    const isFormInvalid = computed(() => {
      console.log("Form checking is being accessed.");
      return validateForm();
    });

    const confirmBooking = async () => {
      if (
        selectedClass.value &&
        selectedTime.value &&
        firstName.value &&
        lastName.value &&
        phone.value &&
        email.value
      ) {
        const bookingDetails = {
          class: {
            instructor: selectedClass.value.instructor,
            name: selectedClass.value.name,
            type: selectedClass.value.type,
            modality: selectedClass.value.modality,
            frequency: selectedClass.value.frequency,
            price: selectedClass.value.price,
            duration: selectedClass.value.duration,
          },
          time: selectedTime.value,
          firstName: firstName.value,
          lastName: lastName.value,
          phone: phone.value,
          email: email.value,
        };

        if (
          selectedClass.value.frequency === "once" ||
          selectedClass.value.frequency === "twice"
        ) {
          bookingDetails.selectedDays = selectedDays.value;
          bookingDetails.selectedMonth = selectedMonth.value;
        }

        try {
          const response = await fetch(
            "http://localhost:3000/classes/booking",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(bookingDetails),
            }
          );

          if (response.ok) {
            bookingConfirmed.value = true;
            router.push("/classes/booking");
          } else {
            console.error("Booking request failed:", response.statusText);
          }
        } catch (error) {
          console.error("Booking request error:", error);
        }
      }
    };

    return {
      availableClasses,
      selectedClass,
      selectedTime,
      firstName,
      lastName,
      isFormInvalid,
      phone,
      email,
      bookingConfirmed,
      availableTimes,
      confirmBooking,
      availableDays,
      selectedMonth,
      selectedDays,
      validationMessage,
      bookedClasses,
    };
  },
};
</script>
