<template>
	<img src="@/assets/avata.jpg" width="200" height="200">
	<nav>
		<RouterLink to="/about">ABOUT</RouterLink>
	</nav>

	<button @click="increment">Count is {{ count }}</button>

</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)

function increment() {
	count.value++
}
</script>