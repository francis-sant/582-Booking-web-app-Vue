<template>
  <div>
    <h1>Classes Available</h1>
    <MyClassesDisplay v-for="item in myClasses" :key="item._id" :item="item" />
    <!-- // Aqui eu estou passando o item para o componente MyItem.vue -->
  </div>
</template>

<script>
// import { ref, onMounted } from "vue"; // Importo o ref e o onMounted para usar com o Composition API
import { useItemsStore } from "@/store/index.js"; // Importo o store (nome do store) que preciso usar nesse view
import MyClassesDisplay from "@/components/MyClassesDisplay.vue";

// Options API aqui você usa as opções diretamente no objeto exportado. Cada opção tem seu próprio contexto e é definida no início do componente.
export default {
  components: {
    MyClassesDisplay,
  },
  data() {
    return {
      myClasses: [],
    };
  },
  async created() {
    // Lifecycle hook that's executed when the component is created
    try {
      const store = useItemsStore(); // declaro a variavel para store e defino ela com a store que estou "chamando";
      this.myClasses = await store.fetchItems(); // Vou fazer o fecth dos items que estão na mongodb q vem atraves da store que quero e vou atribuir a variavel myItems q recebe como um empty array
    } catch (error) {
      console.error(error);
    }
  },
};

//esse foi feito com Composition API: setup() 'https://vuejs.org/api/composition-api-setup.html'
// export default {
//   components: {
//     MyItem,
//   },
//   setup() {
//     const store = useItemsStore(); // Aqui eu uso a store Pinia correta para os items
//     const myItems = ref([]); // Aqui eu crio uma variável reativa para receber os items q estão vindo da mongodb para serem recebidos e enviados para o componente MyItem.vue

//     onMounted(async () => {
//       // Aqui eu uso o onMounted para receber os items da mongodb
//       myItems.value = await store.fetchItems(); // Aqui eu faço um fetch dos items ou do que to recebendo, que a Store está recebendo da mongodb através da
//     });

//     return {
//       myItems,
//     };
//   },
// };
</script>
