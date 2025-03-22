<template>
	<div class="container" ref="container">
		<a class="btn" @click="Fullscreen()">Fullscreen</a>
	</div>
</template>

<script setup lang="ts">
import { useTemplateRef } from "vue";

const container = useTemplateRef("container");
if (!container) {
	console.log("NULL");
}
function Fullscreen() {
	container.value?.requestFullscreen();
}
</script>

<style>
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
