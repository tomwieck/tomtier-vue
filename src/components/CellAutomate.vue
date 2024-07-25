<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
const colors: Array<number>[] = [];

let energy = [50, 50, 100];

declare global {
  interface Window {
    terra: any;
  }
}

const getRandomInt = (min: any, max: any) => Math.random() * (max - min) + min;

colors.push(getRandomInt(0, 50), getRandomInt(0, 50), getRandomInt(0, 50));

createCells();

function createCells() {
  var bbTerrarium = new window.terra.Terrarium(100, 100);

  console.log(colors[0], colors[1]);
  window.terra.registerCreature({
    type: "plant",
    color: [getRandomInt(200, 255), 20, 10],
    size: 10,
    initialEnergy: energy[0],
    maxEnergy: 100,
    wait: function () {
      // photosynthesis :)
      energy[0] += 1;
    },
    move: false,
    reproduceLv: 0.65,
  });

  window.terra.registerCreature({
    type: "brute",
    color: [20, getRandomInt(125, 255), 10],
    maxEnergy: 100,
    initialEnergy: 100,
    size: 20,
    wait: function () {
      // photosynthesis :)
      energy[1] += 1;
    },
  });
  console.log(colors[0], colors[1]);

  window.terra.registerCreature({
    type: "bully",
    color: [10, 125, 10],
    initialEnergy: energy[2],
    maxEnergy: 200,
    sustainability: 30,
  });
  console.log(colors[2]);

  window.terra.registerCA({
    type: "elementary",
    alive: false,
    ruleset: [1, 0, 0, 1, 0, 0, 1, 0].reverse(), // rule 146
    colorFn: function () {
      return this.alive ? this.color + ",1" : "0,0,0,0";
    },
    process: function (neighbors: any, x: any, y: any) {
      if (this.age === y) {
        var index = neighbors
          .filter(function (neighbor: any) {
            return neighbor.coords.y === y - 1;
          })
          .map(function (neighbor: any) {
            return neighbor.creature.alive ? 1 : 0;
          });
        index = parseInt(index.join(""), 2);
        this.alive = isNaN(index) ? !x : this.ruleset[index];
      }
      return true;
    },
  });

  window.terra.registerCA({
    type: "cyclic",
    colors: ["255,0,0,1", "0,255,0,1", "0,0,0,1"],
    colorFn: function () {
      return this.colors[this.state];
    },
    process: function (neighbors: any) {
      var next = (this.state + 1) % 20;
      var changing = neighbors.some(function (spot: any) {
        return spot.creature.state === next;
      });
      if (changing) this.state = next;
      return true;
    },
  });

  bbTerrarium.grid = bbTerrarium.makeGridWithDistribution([
    ["plant", 40],
    ["brute", 5],
    ["bully", 5],
    // ["elementary", 1000],
    // ["cyclic", 100],
  ]);

  bbTerrarium.animate(200);

  const useMouse = () => {
    const x = ref(0);
    const y = ref(0);
    const update = (e: MouseEvent) => {
      console.log(e);
      bbTerrarium.animate(1);
      x.value = e.pageX;
      y.value = e.pageY;
    };
    onMounted(() => {
      window.addEventListener("mousemove", update);
    });
    onUnmounted(() => {
      window.addEventListener("mousemove", update);
    });
    return { x, y };
  };

  useMouse();
}
</script>

<template>
  <div class="full"></div>
  <div class="jittery-container">
    <h1>
      <span class="jittery">T</span>
      <span class="jittery">o</span>
      <span class="jittery">m</span>
      &nbsp;
      <span class="jittery">T</span>
      <span class="jittery">i</span>
      <span class="jittery">e</span>
      <span class="jittery">r</span>
      <span class="jittery">.</span>
    </h1>
  </div>
  <h2>Cool It Down</h2>
  <div class="audio-container">
    <audio controls>
      <source src="/DOWN.mp3" type="audio/mpeg" />
      Your browser does not support the audio tag.
    </audio>
  </div>

  <h2>Goron</h2>
  <div class="audio-container">
    <audio controls>
      <source src="/GORON.mp3" type="audio/mpeg" />
      Your browser does not support the audio tag.
    </audio>
  </div>

  <div style="margin: 0 auto; text-align:center;">
    <iframe
      width="50%"
      height="250px"
      scrolling="no"
      frameborder="no"
      allow="autoplay"
      style="margin: 0 auto;"
      src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1853197767&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
    ></iframe>
  </div>
  <div
    style="
      font-size: 10px;
      color: #cccccc;
      line-break: anywhere;
      word-break: normal;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-family: Interstate, Lucida Grande, Lucida Sans Unicode, Lucida Sans,
        Garuda, Verdana, Tahoma, sans-serif;
      font-weight: 100;
    "
  >
    <a
      href="https://soundcloud.com/first-dozen"
      title="first dozen"
      target="_blank"
      style="color: #cccccc; text-decoration: none"
      >first dozen</a
    >
    ·
    <a
      href="https://soundcloud.com/first-dozen/sets/mixes"
      title="FD Mixes 23/06"
      target="_blank"
      style="color: #cccccc; text-decoration: none"
      >FD Mixes 23/06</a
    >
  </div>
  <div
    style="
      font-size: 5vw;
      color: #cccccc;
      line-break: anywhere;
      word-break: normal;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-family: Pixellari;
      font-weight: 100;
    "
  >
    <a
      href="https://soundcloud.com/first-dozen"
      title="first dozen"
      target="_blank"
      style="color: #cccccc; text-decoration: none"
      >first dozen</a
    >
    ·
    <a
      href="https://soundcloud.com/first-dozen/sets/mixes"
      title="FD Mixes 23/06"
      target="_blank"
      style="color: #cccccc; text-decoration: none"
      >FD Mixes 23/06</a
    >
  </div>
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

canvas {
  width: 100% !important;
  height: 100% !important;
  left: 0;
  top: 0;
  position: absolute;
  z-index: -1;
}

.full {
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  position: absolute;
  z-index: -1;
}
</style>
