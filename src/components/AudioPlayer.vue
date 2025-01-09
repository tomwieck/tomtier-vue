<script setup lang="ts">
const props = defineProps({
  file: String,
});
</script>

<template>
  <div class="audio-container">
    <audio controls>
      <source :src="props.file" type="audio/mpeg" />
      Your browser does not support the audio tag.
    </audio>
  </div>
</template>

<style scoped>
.audio-container {
  padding: 20px 0;
  text-align: center;
  width: 100%;
}

audio {
  height: 32px;
  width: 90vw;
}
</style>
