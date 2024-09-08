<script setup lang="ts">
import Nav from './components/Nav.vue'
</script>

<template>
	<Nav></Nav>
	<div class="body-container">
		<RouterView></RouterView>
	</div>
</template>

<style scoped>
.body-container {
	margin: 0px 8px;
}
</style>