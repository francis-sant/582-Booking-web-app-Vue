<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/classes">Book My Class</router-link> |
    <router-link to="/services">Insert my Services</router-link> |
    <router-link to="/reschedule">Reschedule My Class</router-link> |
  </nav>
  <router-view />
</template>

<script>
import { useClassesStore } from "@/store/classes.js";
import { useTeacherStore } from "@/store/teacher.js";
import { onMounted } from "vue";

export default {
  name: "App",

  setup() {
    const fetchBookedClasses = async () => {
      try {
        const response = await fetch("http://localhost:3000/services/booked");
        if (response.ok) {
          const bookedClass = await response.json();
          // bookedClasses.value = bookedClass; // Store fetched booked classes
          const classesStore = useClassesStore();
          classesStore.setAvClasses(bookedClass);

          const teacherStore = useTeacherStore();
          teacherStore.setAvClasses(bookedClass);
        } else {
          console.error("Failed to fetch booked classes:", response.statusText);
        }
      } catch (error) {
        console.error("Error while fetching booked classes:", error);
      }
    };
    // --------------------------------------------------------------------------------------------------------------------------------------------------------
    onMounted(async () => {
      // choosing a default to be already available in the menu offer
      fetchBookedClasses();
    });
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.titulo {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  margin: 20px;
  padding: 20px;
  border: 3px solid #8ee1dd;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}

form {
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: auto;
}

.classesDisplay {
  border: 3px solid #8ee1b7;
}

.validationMessage {
  color: red;
  font-size: 20px;
  margin: 0;
  padding: 0;
  margin-bottom: 10px;
}

.titulo {
  font-size: 18px;
  margin: auto;
  padding: 20px;
  border: 3px solid lightblue;
  /* max-width: 500px; */
  /* width: 100%; */
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  height: 100%;
  // max-height: 500px;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}

.myclasses {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: auto;
}

.personalinfo {
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: auto;
}
</style>
