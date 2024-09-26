<script setup lang="ts">
import Nav from "./components/Nav.vue";
</script>

<template>
  <Nav></Nav>
  <div id="main">
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
#main {
  flex: 1;
}
</style>
