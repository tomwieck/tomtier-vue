<script setup lang="ts">
import { onMounted, ref } from "vue";

const props = defineProps({
  url: {
    type: String,
    default:
      "https://stream.firstdozenradio.online/listen/first_dozen/radio.mp3",
  },
});

let audio: HTMLAudioElement | null = null;
let isPlaying = ref(false);

const play = async () => {
  if (audio && isPlaying.value) {
    audio.pause();
  }
  if (audio && !isPlaying.value) {
    audio.play();
  }
};

onMounted(() => {
  audio = new Audio(props.url);
  audio.addEventListener("play", () => {
    isPlaying.value = true;
    return isPlaying;
  });
  audio.addEventListener("pause", () => {
    isPlaying.value = false;
    return isPlaying;
  });
});
</script>

<template>
  <div @click="play" class="overlap">
    <img class="layer1" :class="{ playing: isPlaying }" src="/logo.png" />
    <img class="layer2" :class="{ playing: isPlaying }" src="/ball.png" />
  </div>
</template>

<style>
.overlap {
  display: grid;
}

.layer1,
.layer2 {
  grid-column: 1;
  grid-row: 1;
  margin: auto;
  width: 300px;
  height: 300px;
}

.layer2 {
  animation-name: spin;
  animation-duration: 1500ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-play-state: paused;
  animation-direction: reverse;
}

.layer1 {
  animation-name: spin;
  animation-duration: 10000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-play-state: paused;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.playing {
  animation-play-state: running;
}
</style>
