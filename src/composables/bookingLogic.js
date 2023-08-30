import { ref } from "vue";
import { useClassesStore } from "@/store/classes.js";

export function useBookingLogic() {
  const classesStore = useClassesStore();

  // const availableClasses = computed(() => classesStore.getAvClasses);
  const validationMessage = ref(""); // Define validationMessage
  const isAlreadyBooked = ref(false); // Define isAlreadyBooked

  // Fetch booked classes from the server
  async function fetchBookedClasses() {
    try {
      const response = await fetch(
        "http://localhost:3000/classes/booking/bookedclasses"
      );
      if (response.ok) {
        const bookedClass = await response.json();
        // bookedClasses.value = bookedClass; // Store fetched booked classes
        const classesStore = useClassesStore();
        classesStore.addBookedClass(bookedClass);
      } else {
        console.error("Failed to fetch booked classes:", response.statusText);
      }
    } catch (error) {
      console.error("Error while fetching booked classes:", error);
    }
  }

  // Check if a specific time slot is already booked
  function timeIsBooked(time, selectedClass, selectedDate) {
    // console.log("entering time is booked", time);
    const selectedClassName = selectedClass;
    const selectedDateValue = selectedDate;

    const classesStore = useClassesStore();
    const bookedClasses = classesStore.getBookedClasses;

    for (const item in bookedClasses) {
      const bookedClass = bookedClasses[item];
      let startTime = bookedClass.selectedTime;
      let duration = bookedClass.duration;

      if (
        bookedClasses.className === selectedClassName &&
        bookedClasses.selectedDate === selectedDateValue &&
        isTimeInRange(time, startTime, duration)
      ) {
        return true;
      }
    }

    return false;
  }
  const isTimeInRange = (time, startTime, duration) => {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [checkHour, checkMinute] = time.split(":").map(Number);

    const startTimeMinutes = startHour * 60 + startMinute;
    const endTimeMinutes = startTimeMinutes + duration;
    const checkTimeMinutes = checkHour * 60 + checkMinute;

    return (
      checkTimeMinutes >= startTimeMinutes && checkTimeMinutes < endTimeMinutes
    );
  };

  // Calculate available time slots for a selected date
  function calculateAvailableTimeSlots(selectedClass, selectedDate) {
    if (!selectedClass || !selectedDate) {
      return ["Select One Date First"];
    } else {
      const selectedDateValue = selectedDate;
      const dateTimes = selectedClass.dateTimes;
      // console.log("dateTimes", dateTimes);

      let selectedDateTime = null;
      for (let i = 0; i < dateTimes.length; i++) {
        if (dateTimes[i].date === selectedDateValue) {
          selectedDateTime = dateTimes[i];
          let startTime = selectedDateTime.startTime;
          let endTime = selectedDateTime.endTime;

          const classDurationMinutes = selectedClass.duration;
          const startHour = parseInt(startTime);
          const endHour = parseInt(endTime);

          const availableHours = [];

          // Loop through each hour slot
          for (let hour = startHour; hour <= endHour; hour++) {
            let availableMinute = 0;

            // Check if the hour is equal to the end hour
            if (hour === endHour && classDurationMinutes < 60) {
              availableMinute = 60 - classDurationMinutes;
            }

            // Construct the available time slot
            availableHours.push(
              `${hour}:${availableMinute.toString().padStart(2, "0")}`
            );
          }

          // Filter out booked time slots
          const filteredAvailableHours = availableHours.filter(
            (time) => !timeIsBooked(time, selectedClass, selectedDate)
          );

          return filteredAvailableHours;
        }
      }

      if (selectedDateTime) {
        return [selectedDateTime.startTime, selectedDateTime.endTime];
      } else {
        return ["No Available Times for Selected Date"];
      }
    }
  }

  // Check if booking is available and return validation message if not
  function checkBookingAvailability(selectedClass, selectedDate, selectedTime) {
    const selectedClassName = selectedClass.name;
    const selectedDateValue = selectedDate;
    const selectedTimeValue = selectedTime;

    const bookedClasses = classesStore.getBookedClasses;

    let isAlreadyBookedValue = false; // Initialize outside the loop

    for (const item of bookedClasses[0]) {
      if (
        item.className === selectedClassName &&
        item.selectedDate === selectedDateValue &&
        item.selectedTime === selectedTimeValue
      ) {
        validationMessage.value =
          "There is no spot available at this time anymore, choose another time";
        isAlreadyBookedValue = true; // Update the value here
        console.log("isAlreadyBooked", isAlreadyBookedValue);
      }
    }

    if (isAlreadyBookedValue) {
      isAlreadyBooked.value = true; // Instead of isAlreadyBooked.value = ref(true);

      return {
        isAlreadyBooked,

        validationMessage,
      };
    } else {
      isAlreadyBooked.value = false; // Instead of isAlreadyBooked.value = ref(true);

      return { isAlreadyBooked: false, validationMessage: "" };
    }
  }

  return {
    fetchBookedClasses,
    timeIsBooked,
    calculateAvailableTimeSlots,
    checkBookingAvailability,
    validationMessage, // Include validationMessage in the return object
    isAlreadyBooked, // Include isAlreadyBooked in the return object
    // availableClasses,
  };
}
