<template>
  <nav class="navhome">
    <router-link to="/">Home</router-link>
    <!-- <router-link to="/instructor">Insert my Services</router-link> |
    <router-link to="/student">Book My Class</router-link> | -->
  </nav>
  <router-view />
</template>

<script>
import { useClassesStore } from "@/store/classes.js";
import { useTeacherStore } from "@/store/teacher.js";
import { useAuthStore } from "@/store/authentication.js";
import { onMounted } from "vue";

export default {
  name: "App",

  setup() {
    const authStore = useAuthStore();
    const isAuthenticated = authStore.isAuthenticated;

    const fetchBookedClasses = async () => {
      try {
        const response = await fetch("http://localhost:3000/student");
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
      fetchBookedClasses();
    });
    return {
      isAuthenticated,
    };
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background-color: #ebdb04;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  background-color: #005670;

  a {
    font-weight: bold;
    color: #eef4fa;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.home {
  padding: 200px 0;

  margin: auto;

  max-width: 400px;
}
//my available classes div:
.myclassesdisplay {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .classesDisplay {
    width: 400px;
    margin: 10px;
    color: #a4fcc6;
    background-color: rgb(0, 86, 112);
    border-radius: 30px;
    padding: 20px;
  }

  .schedule {
    ul {
      display: contents;
      li {
        list-style: none;
        margin: auto;
      }
    }
  }
}

form {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto;
  margin-bottom: 20px;

  input {
    margin-bottom: 10px;
    padding: 15px;
    border-radius: 20px;
  }
  button {
    margin: 10px;
    padding: 10px;
    border: 3px solid #a4fcc6;
    background-color: rgb(0, 86, 112);
    color: #a4fcc6;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      background-color: #a4fcc6;
      color: rgb(0, 86, 112);
    }
  }
}

.classesDisplay {
  border: 3px solid #8ee1b7;
}

.validationMessage {
  color: red;
  font-size: 20px;
  margin: 0;
  padding: 0;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
}

.titulo {
  font-size: 18px;
  margin: auto;
  padding: 20px;
  border: 3px solid lightblue;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  height: 100%;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}

.myclasses {
  background: #005670;
  padding: 20px;
  color: #a4fcc6;
  font-weight: 200;
  font-size: 20px;

  .dropdown {
    display: flex;
    align-items: center;
    justify-content: center;

    select {
      padding: 10px;
      border-radius: 10px;
      font-size: 20px;
    }
    #class {
      margin-right: 51px;
    }
    #date {
      margin-right: 51px;
    }
  }
}

.classInfo {
  font-size: 19px;
  color: #005670;
  background-color: #a4fcc6;
  border-radius: 30px;
  padding: 20px;
  width: 90%;
  max-width: 252px;
  margin: 20px auto;
}

.personalinfo {
  background: #005670;
  padding: 20px;
  color: #a4fcc6;
  font-weight: 200;
  font-size: 20px;

  .personalForm {
    padding: 20px;
    display: grid;
    margin: auto;
    min-width: 300px;
    max-width: 500px;

    input {
      padding: 10px;
      border-radius: 10px;
      font-size: 20px;
      margin-bottom: 10px;
    }
  }
  button {
    margin: 10px auto;
    padding: 13px;
    border: 3px solid #a4fcc6;
    background-color: rgb(0, 86, 112);
    color: #a4fcc6;
    font-size: 20px;
    font-weight: bold;
    width: 222px;

    background-color: #333;
    border-color: #666;
    color: #666;
    cursor: not-allowed;

    &:enabled {
      background-color: rgb(0, 86, 112);
      border-color: #a4fcc6;
      color: #a4fcc6;
      cursor: pointer;
    }
  }
}

.classbooked {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #c35f16;
  color: white;
  font-size: 20px;

  h2,
  p {
    border: 3px solid;
    padding: 30px;
    border-radius: 20px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;

    margin: auto;
    padding: 20px;
  }
}

.studentsinfo {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.studentdetails {
  flex: 1;
  width: 400px;
  margin: 10px;

  color: #a4fcc6;
  background-color: rgb(0, 86, 112);
  border-radius: 30px;
  padding: 20px;

  button {
    margin: 10px auto;
    padding: 13px;
    border: 3px solid #a4fcc6;
    background-color: rgb(0, 86, 112);
    color: #a4fcc6;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    width: 222px;

    &:hover {
      background-color: #a4fcc6;
      color: rgb(0, 86, 112);
    }
  }
}

@media (max-width: 768px) {
  .myclasses .dropdown {
    flex-direction: column;
    align-items: center;

    #class,
    #date {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
}
</style>
