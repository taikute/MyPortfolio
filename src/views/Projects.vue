<template>
  <div class="header">My featured projects</div>
  <div class="projects-container">
    <div v-for="item in items" class="item-container">
      <div class="name">{{ item.projectName }}</div>
      <div class="timeline">{{ item.timeline }}</div>
      <div class="platform">{{ item.platform }}</div>
      <div class="framework">
        <i :class="item.iconClass"></i> {{ item.framework }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
class Item {
  projectName: string;
  iconClass: string;
  timeline: string;
  platform: string;
  framework: string;

  constructor(
    projectName: string,
    iconClass: string,
    timeline: string,
    platform: string,
    framework: string
  ) {
    this.projectName = projectName;
    this.iconClass = iconClass;
    this.timeline = timeline;
    this.platform = platform;
    this.framework = framework;
  }
}

const items: Item[] = [
  new Item("My Portfolio", "fa-brands fa-vuejs", "09/2024 - now", "Web", "Vue"),
  new Item(
    "Katinat",
    "fa-brands fa-flutter",
    "04/2024 - 05/2024",
    "Android",
    "Flutter"
  ),
  new Item(
    "Spy Mouse",
    "fa-brands fa-java",
    "10/2023 - 12/2023",
    "Android",
    "LibGDX"
  ),
  new Item(
    "Ice Library",
    "fa-solid fa-code",
    "04/2023 - 06/2023",
    "Web",
    ".NET Core"
  ),
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
  aspect-ratio: 2/3;
}

.name {
  text-align: center;
  font-size: 30px;
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
