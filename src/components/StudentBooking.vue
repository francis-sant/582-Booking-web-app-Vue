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

    <label for="time">Choose a Time:</label>
    <select id="time" v-model="selectedTime">
      <option v-for="time in availableTimes" :key="time">{{ time }}</option>
    </select>

    <div v-if="selectedClass">
      <p>Type: {{ selectedClass.type }}</p>

      <div v-if="selectedClass.frequency === 'once'">
        <label for="selectedDay"> Dia da semana (selecione um): </label>
        <div v-if="selectedClass.frequency === 'once'">
          <label v-for="(day, index) in availableDays" :key="index">
            <input
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
      <select id="selectedMonth" v-model="selectedMonth">
        <option v-for="month in selectedClass.months" :key="month">
          {{ month }}
        </option>
      </select>

      <p>Frequency: {{ selectedClass.frequency }}</p>
      <p>Modality: {{ selectedClass.modality }}</p>
      <p>Price: $ {{ selectedClass.price }}</p>
    </div>

    <label for="firstName">First Name:</label>
    <input id="firstName" v-model="firstName" />

    <label for="lastName">Last Name:</label>
    <input id="lastName" v-model="lastName" />

    <label for="phone">Phone:</label>
    <input id="phone" v-model="phone" />

    <label for="email">Email:</label>
    <input id="email" v-model="email" />

    <button @click="confirmBooking">Confirm Booking</button>

    <div v-if="bookingConfirmed">
      <h2>Confirmation</h2>
      <p>Class: {{ selectedClass.name }}</p>
      <p>Time: {{ selectedTime }}</p>
      <p>Name: {{ fullName }}</p>
      <p>Phone: {{ phone }}</p>
      <p>Email: {{ email }}</p>
    </div>
  </div>
</template>

<script>
import { useClassesStore } from "@/store/classes.js";
import { ref, computed } from "vue";
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
    const availableClasses = classesStore.availableClasses;
    const selectedClass = ref(null);
    const selectedTime = ref(null);
    const selectedDay = ref("");
    const firstName = ref("");
    const lastName = ref("");
    const phone = ref("");
    const email = ref("");
    const bookingConfirmed = ref(false);
    const selectedMonth = ref("");
    const selectedDays = ref([]);

    const availableTimes = computed(() => {
      if (selectedClass.value) {
        const { startTime, endTime } = selectedClass.value;
        const times = [];
        const [startHour] = startTime.split(":").map(Number);
        const [endHour] = endTime.split(":").map(Number);

        for (let hour = startHour; hour <= endHour; hour++) {
          for (let minute = 0; minute <= 59; minute++) {
            times.push(formatHourMinute(hour, minute));
          }
        }
        return times;
      }
      return [];
    });

    const formatHourMinute = (hour, minute) => {
      const period = hour >= 12 ? "pm" : "am";
      const formattedHour = hour > 12 ? hour - 12 : hour;
      const formattedMinute = String(minute).padStart(2, "0");
      return `${formattedHour}:${formattedMinute}${period}`;
    };

    const fullName = computed(() => `${firstName.value} ${lastName.value}`);

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
          class: selectedClass.value,
          time: selectedTime.value,
          fullName: fullName.value,
          phone: phone.value,
          email: email.value,
        };

        if (
          selectedClass.value.frequency === "once" ||
          selectedClass.value.frequency === "twice"
        ) {
          bookingDetails.selectedDay = selectedDay.value;
          bookingDetails.selectedMonth = selectedMonth.value;
        }

        try {
          const response = await fetch(
            "http://localhost:3000/student/booking",
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
            router.push("/student/booking");
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
      fullName,
      phone,
      email,
      bookingConfirmed,
      availableTimes,
      confirmBooking,
      availableDays,
      // availableMonths,
      selectedMonth,
      selectedDays,
      selectedDay,
    };
  },
};
</script>
