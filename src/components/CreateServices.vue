<template>
  <div>
    <h2>New Services</h2>
    <form @submit.prevent="createServices">
      <label for="servicename">Service Name:</label>
      <input type="text" id="servicename" v-model="servicename" required />

      <label for="serviceprice">Service Price:</label>
      <input type="text" id="serviceprice" v-model="serviceprice" required />

      <label for="servicedescription">Service Description:</label>
      <input
        type="text"
        id="servicedescription"
        v-model="servicedescription"
        required
      />

      <label for="serviceduration">Service Duration</label>
      <input
        type="text"
        id="serviceduration"
        v-model="serviceduration"
        required
      />

      <label for="servicelocation">Service Location</label>
      <input
        type="text"
        id="servicelocation"
        v-model="servicelocation"
        required
      />

      <button type="submit">Create Service</button>
    </form>
  </div>
</template>

<script>
import { useClassesStore } from "../store/classes";

export default {
  name: "CreateServices",
  data() {
    return {
      servicename: "",
      serviceprice: "",
      servicedescription: "",
      serviceduration: "50",
      servicelocation: "",
    };
  },
  methods: {
    createServices() {
      // Chama a ação do store para criar o serviço
      const classesStore = useClassesStore();
      classesStore.createServices({
        servicename: this.servicename,
        serviceprice: this.serviceprice,
        servicedescription: this.servicedescription,
        serviceduration: this.serviceduration,
        servicelocation: this.servicelocation,
      });
      this.$router.push("/services");

      // Limpa os campos após criar o serviço
      this.servicename = "";
      this.serviceprice = "";
      this.servicedescription = "";
      this.serviceduration = "50";
      this.servicelocation = "";
    },
  },
};
</script>
