<template>
  <div class="game" :class="landscape" :style="{ height: gameHeight }">
    <div class="board">
      <svg :viewBox="hive.viewBox" width="100%" height="100%">
        <g style="transition: 0.2s" :class="hive.rotate">
          <g
            v-for="piece in hive.pieces"
            :key="piece.id"
            :transform="`translate(${piece.hex.tX}, ${piece.hex.tY})`"
            @click="hive.selected = piece.id"
          >
            <polygon :points="points" fill="brown" :class="{ selected: piece.id === hive.selected }"></polygon>
          </g>
          <g>
            <polygon :points="points" fill="none" stroke="pink" stroke-width="4"></polygon>
          </g>
          <g v-if="hive.selected" v-for="(hex, index) in hive.targets" :key="index"></g>
        </g>
      </svg>
    </div>
    <div class="panel">
      <div class="rotate">
        <a class="btn" @click="changeHiveOrientation()"><i class="fa-solid fa-arrow-left"></i></a>
        <a class="btn">Rotate</a>
        <a class="btn" @click="changeHiveOrientation()"><i class="fa-solid fa-arrow-right"></i></a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import Hive, { points } from "@/hive";

const hive = ref(new Hive());
const landscape = ref<string>("");
const gameHeight = ref<string>("0px");

function changeHiveOrientation() {
  if (hive.value.rotate == "flat") {
    hive.value.rotate = "pointy";
  } else {
    hive.value.rotate = "flat";
  }
}

onMounted(() => {
  landscape.value = window.innerWidth < window.innerHeight ? "" : "landscape";
  gameHeight.value = `${window.innerHeight - 80}px`;
  window.addEventListener("resize", () => {
    gameHeight.value = `${window.innerHeight - 80}px`;
    if (window.innerWidth < window.innerHeight) {
      landscape.value = "";
    } else {
      landscape.value = "landscape";
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

.rotate {
  display: flex;
}

.landscape {
  flex-direction: row;
}

.landscape .panel {
  height: 100%;
  width: 20%;
}

.pointy {
  rotate: -30deg;
}
</style>
