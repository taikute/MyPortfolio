<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, useTemplateRef } from "vue";
import spriteUrl from "@/assets/mouse_sprite.png";

const canvas = useTemplateRef("canvas");
const sprite = new Image();
sprite.src = spriteUrl;

const frameWidth = 200;
const frameHeight = 150;
const totalFrames = 10;
const frameSpeed = 400;
let frameIndex = 0;

let animationId: number;

const drawFrame = () => {
	const mouse = canvas.value;
	if (!mouse) return;

	const ctx = mouse.getContext("2d");
	if (!ctx) return;

	ctx.clearRect(0, 0, mouse.width, mouse.height);
	ctx.save();

	ctx.translate(frameWidth, 0);
	ctx.scale(-1, 1);

	ctx.drawImage(sprite, frameIndex * frameWidth, 0, frameWidth, frameHeight, 0, 0, frameWidth, frameHeight);

	ctx.restore();

	frameIndex = (frameIndex + 1) % totalFrames;
	animationId = setTimeout(() => requestAnimationFrame(drawFrame), frameSpeed);
};

onMounted(() => {
	sprite.onload = () => drawFrame();
});

onBeforeUnmount(() => {
	clearTimeout(animationId);
});
</script>

<template>
	<div class="container">
		<canvas ref="canvas" width="200" height="150"></canvas>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
