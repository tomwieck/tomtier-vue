<script setup lang="ts">
import Heading from "./Heading.vue";
</script>

<template>
  <Heading text="First Dozen" />
  <div class="img-container">
    <img src="/dealer.png" />
  </div>
</template>

<style>
h1 {
  font-size: 10vw;
  font-family: "Pixellari";
  margin: 0;
}

h2 {
  font-size: 3vw;
  font-family: "Pixellari";
  margin: 5px;
  margin-bottom: 0;
  margin-left: 34px;
}

.img-container {
  display: flex;
  justify-content: center;
}

img {
  max-width: 300px;
}
</style>
