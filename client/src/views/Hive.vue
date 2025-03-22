<template>
  <div class="game" :class="orient" :style="{ height: gameHeight }">
    <div class="board">
      <svg :viewBox="hive.viewBox" width="100%" height="100%">
        <defs>
          <polygon id="hex" points="98,0 48,85 -48,85 -98,0 -48,-85 48,-85"></polygon>
        </defs>
        <g style="transition: 0.2s" :class="hive.rotateType">
          <use
            v-for="{ coord, stack } in hive.pieceView"
            href="#hex"
            fill="brown"
            :x="coord.tX"
            :y="coord.tY"
            :class="{ selected: id === hive.selected }"
            @click="hive.selected = id"
            :key="id"
          ></use>

          <!-- <use href="#hex" v-if="hive.selectedId !== null" v-for="(coord, index) in hive.targets" :key="index"></use> -->
        </g>
      </svg>
    </div>
    <!-- <div class="panel">
      <div class="rotate-bar">
        <a class="btn" @click="hive.swapRotateType()"><i class="fa-solid fa-arrow-left"></i></a>
        <a class="btn" @click="hive.swapRotateType()">Rotate</a>
        <a class="btn" @click="hive.swapRotateType()"><i class="fa-solid fa-arrow-right"></i></a>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Hive from "@/hive/hive";
import type { OrientationType } from "@/hive/types";

const hive = ref(new Hive());
const orient = ref<OrientationType>("orient-portrait");
const gameHeight = ref<string>("0px");

onMounted(() => {
  orient.value = window.innerWidth < window.innerHeight ? "orient-portrait" : "orient-landscape";
  gameHeight.value = `${window.innerHeight - 80}px`;
  window.addEventListener("resize", () => {
    gameHeight.value = `${window.innerHeight - 80}px`;
    if (window.innerWidth < window.innerHeight) {
      orient.value = "orient-portrait";
    } else {
      orient.value = "orient-landscape";
    }
  });
});
</script>

<style scoped>
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.board {
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.selected {
  stroke: cyan;
  stroke-width: 4;
}

.panel {
  height: 15%;
  width: 100%;
  background-color: #333;
}

.rotate-bar {
  display: flex;
}

.orient-landscape {
  flex-direction: row;
}

.orient-landscape .panel {
  height: 100%;
  width: 20%;
}

.rotate-pointy {
  rotate: -30deg;
}
</style>
