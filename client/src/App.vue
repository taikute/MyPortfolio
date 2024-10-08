<template>
  <Nav></Nav>
  <div style="flex: 1">
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import Nav from "./components/Nav.vue";
</script>
