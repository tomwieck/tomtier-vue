<script setup lang="ts">
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

  window.terra.registerCreature({
    type: "bully",
    color: [10, 125, 10],
    initialEnergy: energy[2],
    maxEnergy: 200,
    sustainability: 30,
  });

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

  bbTerrarium.animate();
}
</script>

<template>
  <div class="full"></div>
</template>

<style>
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
