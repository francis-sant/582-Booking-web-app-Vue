<template>
  <ParkSelect :allParks="allParks" @populateForm="populateForm" />
  <ParkForm :selectedPark="selectedPark" />
</template>

<script>
import ParkSelect from "../components/ParkSelect.vue";
import ParkForm from "../components/ParkForm.vue";

export default {
  name: "UpdateParkFormView",
  data() {
    return {
      allParks: [],
      selectedPark: {},
    };
  },
  components: {
    ParkSelect,
    ParkForm,
  },
  methods: {
    fetchParks() {
      this.allParks = [];
      fetch("https://special-doodle-r949xwgp9jpf5w56-3000.app.github.dev/admin")
        .then((response) => response.json())
        .then((json) => {
          for (let park of json) {
            this.allParks.push(park);
          }
        });
    },
    populateForm(selectedPark) {
      for (let i = 0; i < this.allParks.length; i++) {
        if (selectedPark.id == this.allParks[i].id) {
          document.querySelector("#park-name-input").value =
            selectedPark.parkName;
          document.querySelector("#park-image-input").value =
            selectedPark.parkImage;
          document.querySelector(
            `input[value="${selectedPark.parkStatus}"]`
          ).checked = true;
          document.querySelector("#soccer").value = selectedPark.soccerFields;
          document.querySelector("#baseball").value =
            selectedPark.baseballDiamonds;
          document.querySelector("#bathrooms").value =
            selectedPark.parkBathrooms;
          document.querySelector("#playground").value =
            selectedPark.parkPlaygrounds;
        }
      }
      this.selectedPark = selectedPark;
    },
  },
  created() {
    this.fetchParks();
  },
};
</script>
