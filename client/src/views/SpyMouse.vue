<template>
	<div class="container" ref="container">
		<a class="btn" @click="Fullscreen()">Fullscreen</a>
	</div>
</template>

<script setup lang="ts">
import { useTemplateRef } from "vue";

const container = useTemplateRef("container");

function Fullscreen() {
	if (!container.value) {
		console.error("Can't find container div.");
		return;
	}
	container.value.requestFullscreen();
}
</script>

<style>
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
}
</style>
