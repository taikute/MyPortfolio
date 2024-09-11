<template>
  <div>{{ data }}</div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

const data = ref('Loading...');
onMounted(async () => {
  const response = await axios.get('https://ice-portfolio-default-rtdb.firebaseio.com/.json');
  alert('Again')
  data.value = response.data;
});
</script>