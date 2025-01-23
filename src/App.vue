<script setup lang="ts">
import RadioPlayer from "./components/RadioPlayer.vue";
</script>

<template>
  <RadioPlayer />
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/mixes">Mixes</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
