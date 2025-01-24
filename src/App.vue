<script setup lang="ts">
import RadioPlayer from "./components/RadioPlayer.vue";
</script>

<template>
  <RadioPlayer />
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/mixes">Mixes</RouterLink>
    <RouterLink to="/tracks">Tracks</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
nav {
  display: flex;
  width: 100%;
  justify-content: space-around;
  font-size: 24px;
  margin-bottom: 16px;
}

nav a {
  color: white;
  width: 100%;
  text-align: center;
  padding: 8px;
}
</style>
