<script setup lang="ts">
import Mouse from "@/spymouse/mouse";
import { nextTick, onMounted, onUnmounted, useTemplateRef, watch, watchEffect } from "vue";

const canvasRef = useTemplateRef("canvas");
const containerRef = useTemplateRef("container");

const mouse = new Mouse();
let lastTime = 0;
let animationId: number | null;
let isTouching = false;

onMounted(async () => {
	history.pushState(null, "", location.href);

	window.addEventListener("popstate", () => {
		console.log("Ngăn chặn Back!");
		history.pushState(null, "", location.href); // Đẩy lại state để ngăn back
	});
	await nextTick();
	const canvas = canvasRef.value!;
	const container = containerRef.value!;
	const ctx = canvas.getContext("2d")!;

	container.addEventListener("click", (ev) => {
		container.requestFullscreen();
	});

	canvas.addEventListener("pointerdown", (ev) => {});

	function loop(time: number) {
		let delta = time - lastTime;
		lastTime = time;

		ctx.clearRect(0, 0, canvasRef.value!.width, canvasRef.value!.height);
		mouse.update(delta);
		mouse.render(ctx);

		animationId = requestAnimationFrame(loop);
	}
	lastTime = performance.now();
	animationId = requestAnimationFrame(loop);

	canvas.addEventListener("pointerdown", (ev) => {
		console.log(ev);
	});
});

onUnmounted(() => {
	if (!animationId) return;
	cancelAnimationFrame(animationId);
});
</script>

<template>
	<div ref="container" class="container" @click="">
		<canvas ref="canvas" width="200" height="200"></canvas>
	</div>
</template>

<style scoped>
.container {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	touch-action: none;
}

canvas {
	/* touch-action: none; */
}
</style>
