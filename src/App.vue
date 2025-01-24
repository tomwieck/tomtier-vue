<script setup lang="ts">
import NowPlaying from "./components/NowPlaying.vue";
import RadioPlayer from "./components/RadioPlayer.vue";
</script>

<template>
  <NowPlaying />
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
