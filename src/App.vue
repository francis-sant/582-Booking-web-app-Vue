<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/reschedule">Reschedule My Class</router-link> |
    <router-link to="/classes">Book My Class</router-link> |
    <router-link to="/teacherclasses">Insert my Services</router-link> |
  </nav>
  <router-view />
</template>

<script>
import { useClassesStore } from "@/store/classes.js";

export default {
  name: "App",

  created() {
    fetch("http://localhost:3000/classes")
      .then((response) => response.json())
      .then((classes) => {
        console.log(classes);
        const classesStore = useClassesStore();
        classesStore.setAvClasses(classes); // Set the data after fetching
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
