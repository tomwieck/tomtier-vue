<script setup lang="ts">
const props = defineProps({
  text: String,
});
</script>

<template>
  <div class="jittery-container">
    <h1>
      <span class="jittery" v-for="item in props.text">
        {{ item }}
      </span>
    </h1>
  </div>
</template>

<style scoped>
.jittery {
  display: inline-block;
  -webkit-text-stroke-width: 4px;
  -webkit-text-stroke-color: white;
  text-transform: uppercase;
  margin: 1vw;
}

@keyframes jitter {
  50% {
    transform: skewY(1deg) skewX(-1deg) scale(1.009);
  }
}

@keyframes jitterY {
  50% {
    transform: translateY(8px);
  }
}

@keyframes jitterYMinus {
  50% {
    transform: translateY(8px);
  }
}

.jittery-container {
  text-align: center;
  width: 100%;
}

.jittery-container span:nth-child(odd) {
  animation: jitter 250ms linear infinite, jitterY 5000ms linear infinite;
  color: black;
}

.jittery-container span:nth-child(even) {
  animation: jitter 200ms linear infinite, jitterY 5000ms reverse infinite;
  color: red;
}
</style>
