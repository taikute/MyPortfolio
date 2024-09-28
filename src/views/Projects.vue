<template>
  <div class="header">My featured projects</div>
  <div class="projects-container">
    <div v-for="item in items" class="item-container">
      <div class="name">{{ item.projectName }}</div>
      <div class="info">Timeline: {{ item.timeline }}</div>
      <div class="info">Platform: {{ item.platform }}</div>
      <div class="info">Framework: <i :class="item.iconClass"></i> {{ item.framework }}</div>
      <img :src="item.imageUrl" />
    </div>
  </div>
</template>

<script setup lang="ts">
import portfolioUrl from "@/assets/projects/portfolio.png";
import katinatUrl from "@/assets/projects/katinat.jpg";
import spymouseUrl from "@/assets/projects/spymouse.png";
import libraryUrl from "@/assets/projects/library.jpg";

interface Item {
  projectName: string;
  iconClass: string;
  imageUrl: string;
  timeline: string;
  platform: string;
  framework: string;
}

const items: Item[] = [
  {
    projectName: "My Portfolio",
    iconClass: "fa-brands fa-vuejs",
    imageUrl: portfolioUrl,
    timeline: "09/2024 - now",
    platform: "Web",
    framework: "Vue",
  },
  {
    projectName: "Katinat",
    iconClass: "fa-brands fa-flutter",
    imageUrl: katinatUrl,
    timeline: "04/2024 - 05/2024",
    platform: "Android",
    framework: "Flutter",
  },
  {
    projectName: "Spy Mouse",
    iconClass: "fa-brands fa-java",
    imageUrl: spymouseUrl,
    timeline: "10/2023 - 12/2023",
    platform: "Android",
    framework: "LibGDX",
  },
  {
    projectName: "Ice Library",
    iconClass: "fa-solid fa-code",
    imageUrl: libraryUrl,
    timeline: "04/2023 - 06/2023",
    platform: "Web",
    framework: ".NET Core",
  },
];
</script>

<style scoped>
.header {
  text-align: center;
  font-size: 30px;
  font-weight: 500;
}

.projects-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.item-container {
  margin-top: 30px;
  padding: 20px;
  border-radius: 20px;
  background-color: gray;
  width: 80%;
  max-width: 400px;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
}

.name {
  text-align: center;
  font-size: 30px;
}

.info {
  font-size: 18px;
  margin: 5px 0;
}

img {
  flex: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (min-width: 800px) {
  .header {
    font-size: 50px;
  }

  .item-container {
    margin-top: 50px;
    width: 40%;
    max-width: 500px;
  }
}
</style>
