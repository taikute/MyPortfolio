<template>
  <div class="nav-bar-container">
    <nav class="nav-bar">
      <RouterLink class="nav-bar-header" to="/">Anh Tài</RouterLink>

      <div class="menu" :class="menuState">
        <div class="menu-btn" @click="changeMenu">
          <div class="bar1"></div>
          <div class="bar2"></div>
          <div class="bar3"></div>
        </div>

        <div class="menu-items" @click="closeMenu">
          <RouterLink v-for="item in navItems" :to="item.path">{{
            item.name
          }}</RouterLink>
        </div>
      </div>

      <div class="nav-bar-items">
        <RouterLink v-for="item in navItems" :to="item.path">{{
          item.name
        }}</RouterLink>
      </div>
    </nav>

    <div class="divider"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const navItems = [
  { path: "/cv", name: "CV" },
  { path: "/projects", name: "Projects" },
  { path: "/chat", name: "Chat" },
];

const menuState = ref<string | null>(null);
function changeMenu() {
  if (menuState.value == null) {
    openMenu();
  } else {
    closeMenu();
  }
}
function openMenu() {
  menuState.value = "show-menu";
}
function closeMenu() {
  menuState.value = null;
}
</script>

<style scoped>
.nav-bar-container {
  display: flex;
  flex-direction: column;
  padding-bottom: 28px;
}

.nav-bar {
  margin: 0 8px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-bar-header {
  font-size: 25px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 8px;
}

.nav-bar-items {
  display: none;
}

.nav-bar-items a {
  font-size: 15px;
  padding: 8px;
  margin: 0px 4px;
  border-radius: 4px;
}

.menu-btn {
  cursor: pointer;
  padding: 6px;
}

.menu-btn div {
  width: 30px;
  height: 4px;
  background-color: white;
  transition: 0.2s;
}

.menu-btn .bar2 {
  margin: 5px 0;
}

.show-menu .menu-btn .bar1 {
  transform: translate(0, 9px) rotate(-45deg);
}

.show-menu .menu-btn .bar2 {
  opacity: 0;
}

.show-menu .menu-btn .bar3 {
  transform: translate(0, -9px) rotate(45deg);
}

.show-menu .menu-items {
  display: flex;
}

.menu-items {
  z-index: 999;
  display: none;
  padding: 8px 8px;
  min-width: 300px;
  flex-direction: column;
  position: absolute;
  right: 8px;
  top: 60px;
  background-color: black;
  border: 2px solid;
  border-radius: 10px;
}

.menu-items a {
  font-size: 16px;
  padding: 8px 10px;
  border-radius: 4px;
}

@media (min-width: 480px) {
  .menu {
    display: none;
  }

  .nav-bar-items {
    display: inline;
  }
}

.divider {
  height: 2px;
  background-color: white;
}
</style>
