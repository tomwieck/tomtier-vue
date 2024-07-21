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
    process: function (neighbors, x, y) {
      if (this.age === y) {
        var index = neighbors
          .filter(function (neighbor) {
            return neighbor.coords.y === y - 1;
          })
          .map(function (neighbor) {
            return neighbor.creature.alive ? 1 : 0;
          });
        index = parseInt(index.join(""), 2);
        this.alive = isNaN(index) ? !x : this.ruleset[index];
      }
      return true;
    },
  });

  window.terra.registerCA(
    {
      type: "cyclic",
      colors: ["255,0,0,1", "0,255,0,1", "0,0,0,1"],
      colorFn: function () {
        return this.colors[this.state];
      },
      process: function (neighbors, x, y) {
        var next = (this.state + 1) % 20;
        var changing = neighbors.some(function (spot) {
          return spot.creature.state === next;
        });
        if (changing) this.state = next;
        return true;
      },
    },
    function () {
      this.state = Math.floor(Math.random() * 20);
    }
  );

  bbTerrarium.grid = bbTerrarium.makeGridWithDistribution([
    ["plant", 50],
    ["brute", 5],
    ["bully", 5],
    // ["elementary", 1000],
    // ["cyclic", 100],
  ]);

  bbTerrarium.animate(10);

  const useMouse = () => {
    const x = ref(0);
    const y = ref(0);
    const update = (e) => {
      console.log(e);
      bbTerrarium.animate(1 );
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
  <div
    class="full"
    @mouseenter="mouseEnter"
    @mousemove="mouseMove"
    @mouseleave="mouseLeave"
  ></div>
  <h1>Tom Tier.</h1>
</template>

<style>
h1 {
  font-size: 10vw;
  font-family: 'Pixellari';
  
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
  width: 100% !important;
  height: 100vh !important;
  left: 0;
  top: 0;
  position: absolute;
  z-index: -1;
}
</style>
