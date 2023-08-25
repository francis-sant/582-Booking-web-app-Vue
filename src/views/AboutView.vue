<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <div></div>
  <!-- <StudentBooking /> -->
</template>

<script>
// import StudentBooking from "@/components/StudentBooking.vue";

export default {
  name: "AboutView",
  components: {
    // StudentBooking,
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
    this.availableClasses = [];
    fetch("http://localhost:3000/classes")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        for (let classes of json) {
          this.availableClasses.push(classes);
        }
      });
  },
};
</script>
