<script setup lang="ts">
import Heading from "./Heading.vue";
import RadioPlayer from "./RadioPlayer.vue";
import AudioPlayer from "./AudioPlayer.vue";
import Soundcloud from "./Soundcloud.vue";
</script>

<template>
  <Heading text="First Dozen" />

  <h2>Radio</h2>
  <RadioPlayer />

  <h2>First Dozen Day Rave 2024 Mixes</h2>
  <Soundcloud />

  <h2>Cool It Down</h2>
  <AudioPlayer file="/DOWN.mp3" />

  <h2>Goron</h2>
  <AudioPlayer file="/GORON.mp3" />
</template>

<style>
h1 {
  font-size: 10vw;
  font-family: "Pixellari";
  margin: 0;
}

h2 {
  text-align: center;
  font-size: 3vw;
  font-family: "Pixellari";
  margin: 5px;
  margin-bottom: -20px;
}
</style>
