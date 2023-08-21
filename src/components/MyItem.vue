<template>
  <div class="titulo">
    <h1>Meu App Vue com Pinia</h1>

    <div class="items">
      <h3>{{ item.name }}</h3>
      <p>{{ item.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object, // o que estou recebendo? Objeto, array, numero, etc.
  },
};
</script>
