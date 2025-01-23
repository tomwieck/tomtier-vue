<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

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

onUnmounted(() => {
  isPlaying.value = false;
  audio?.pause();
});
</script>

<template>
  <div class="sticky">
    <div @click="play" class="container">
      <img class="layer1" :class="{ playing: isPlaying }" src="/logo.png" />
      <img class="layer2" :class="{ playing: isPlaying }" src="/ball.png" />
      <div class="text">Now Playing:</div>
    </div>
  </div>
</template>

<style>
.sticky {
  position: sticky;
  top: 0;
  z-index: 999;
  filter: drop-shadow(0px 3px 3px black);
  /* background-image: url("./bg.png"); */
  background-color: black;
  background-repeat: repeat-x;
  background-size: contain;
}

.container {
  display: grid;
  width: 100%;
  height: 80px;
  border-bottom: 2px solid rgb(0, 0, 0);
  grid-template-columns: minmax(80px, 80px) minmax(100%, 100%);
}

.layer1,
.layer2 {
  grid-column: 1;
  grid-row: 1;
  margin: auto;
  width: 80px;
  height: 80px;
}

.text {
  grid-column: 2;
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
