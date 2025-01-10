<template>
  <div class="board">
    <div class="root">
      <div class="hex" v-for="hex in hexs" :style="hex.translateStyle()"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
class Hex {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  private translateWidth(): number {
    return this.x * 75 - 50;
  }

  private translateHeight(): number {
    return (this.y - this.z) * 50 - 50;
  }

  translateStyle(): string {
    return `transform: translate(${this.translateWidth()}%, ${this.translateHeight()}%)`;
  }
}

const hexs: Hex[] = [
  new Hex(0, 0, 0),
  new Hex(1, 0, -1),
  new Hex(1, -1, 0),
  new Hex(0, -1, 1),
  new Hex(-1, 0, 1),
  new Hex(-1, 1, 0),
  new Hex(0, 1, -1),
];
</script>

<style scoped>
.board {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.root {
  position: relative;
  transition: 0.2s;
}

.root:hover {
  rotate: -30deg;
}

.hex {
  position: absolute;
  width: 100px;
  aspect-ratio: 1.155;
  clip-path: polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  background-color: brown;
}
</style>
