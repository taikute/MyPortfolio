<template>
  <div class="board" @click="hive.addRandom()">
    <svg :viewBox="hive.viewBox" width="100%" height="100%">
      <g v-for="(hex, index) in hive.hexs" :key="index" :transform="`translate(${hex.tX}, ${hex.tY})`">
        <polygon points="100,0 50,87 -50,87 -100,0 -50,-87 50,-87" fill="brown"></polygon>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Hive from "@/hive";

const hive = ref(new Hive());
</script>

<style scoped>
.board {
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
