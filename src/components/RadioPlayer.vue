<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import NowPlaying from "./NowPlaying.vue";

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
      <div v-if="isPlaying" class="text">
        <NowPlaying />
      </div>
      <div v-else class="text">&#9658; Play</div>
    </div>
  </div>
</template>

<style>
.sticky {
  position: sticky;
  top: 0;
  z-index: 999;
  background-image: url("@/assets/bg.png");
  background-repeat: repeat-x;
  background-size: contain;
}

.text {
  display: flex;
  align-items: center;
  padding-left: 16px;
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
