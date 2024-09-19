<script setup lang="ts">
import Nav from "./components/Nav.vue";
</script>

<template>
  <div style="display: flex; flex-direction: column; height: 100%">
    <Nav></Nav>
    <!-- Navbar height: 80px -->
    <div style="flex: 1">
      <RouterView></RouterView>
    </div>
  </div>
</template>
