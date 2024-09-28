<template>
  <div class="cv-container">
    <a :href="cvUrl" class="btn btn-primary">Download my CV</a>
    <img src="../assets/cv.jpg" alt="cv" />
  </div>
</template>

<script setup lang="ts">
const cvUrl: string = "https://drive.google.com/uc?export=download&id=1J8g5PIyeBLGZI6byNaQKsr0tSOg1tz74";
</script>

<style scoped>
.cv-container {
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

a {
  font-size: 20px;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 50ch;
}

img {
  margin: 30px 0px;
  max-width: 800px;
  width: 100%;
}

@media (min-width: 992px) {
  a {
    font-size: 25px;
  }
}
</style>
