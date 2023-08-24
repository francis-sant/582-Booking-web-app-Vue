<template>
  <div>
    <h1>Classes Available</h1>
    <!-- <MyClassesDisplay /> -->
  </div>
</template>

<script>
// import MyClassesDisplay from "@/components/MyClassesDisplay.vue";
import { useClassesStore } from "@/store/classes.js";

export default {
  name: "ClassesAvailable",
  components: {
    // MyClassesDisplay,
  },
  setup() {},
  data() {
    return {
      availableClasses: [],
    };
  },
  methods: {
    custom() {},
  },
  created() {
    fetch("http://localhost:3000/classes")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        const classesStore = useClassesStore();
        classesStore.setAvClasses(json);
      });
  },
};
</script>
