<!-- <template>
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

    <p>Type: {{ selectedClass.type }}</p>
    <p>Frequency: {{ selectedClass.frequency }}</p>
    <p>Modality: {{ selectedClass.modality }}</p>
    <p>Duration: {{ selectedClass.duration }} minutes</p>
    <p>Price: $ {{ selectedClass.price }}</p>
  </div>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useClassesStore } from "@/store/classes.js";

export default {
  name: "ClassSelection",

  setup() {
    const classesStore = useClassesStore();
    const availableClasses = computed(() => classesStore.getAvClasses);
    const selectedClass = ref(null);

    onMounted(() => {
      selectedClass.value = availableClasses.value[0];
    });

    return {
      availableClasses,
      selectedClass,
    };
  },
};
</script> -->
