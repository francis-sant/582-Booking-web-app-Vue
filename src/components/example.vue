<template>
  <label for="parks">Select Park: </label>
  <select name="parks" id="parks" @change="selectPark">
    <option value=""></option>
    <option v-for="park in this.allParks" :value="park.parkName" :key="park.id">
      {{ park.parkName }}
    </option>
  </select>
</template>

<script>
export default {
  name: "ParkSelect",
  emits: ["populateForm"],
  props: {
    allParks: {
      type: Array,
      default() {
        return [
          {
            id: 0,
            parkName: "default",
            parkImage: "http://www.example.com",
            parkStatus: "no status",
            soccerFields: 0,
            baseballDiamonds: 0,
            parkBathrooms: 0,
            parkPlaygrounds: 0,
          },
        ];
      },
    },
  },
  methods: {
    selectPark() {
      for (let i = 0; i < this.allParks.length; i++) {
        if (this.allParks[i].parkName == event.target.value) {
          let selectedPark = this.allParks[i];
          this.$emit("populateForm", selectedPark);
        }
      }
    },
  },
};
</script>
