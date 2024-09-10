<template>
	<h1 style="text-align: center; font-size: 50px;">My featured projects</h1>
	<div class="container">
		<div v-for="item in items" class="item-container">
			<h2 style="text-align: center;">{{ item.projectName }}</h2>

		</div>
	</div>
</template>

<script setup lang="ts">
class Item {
	projectName: string;
	timeline: string;

	constructor(projectName: string, timeline: string) {
		this.projectName = projectName;
		this.timeline = timeline;
	}
}

const items: Item[] = [
	new Item('Portfolio', ''),
	new Item('Katinat', ''),
	new Item('SpyMouse', ''),
	new Item('IceLibrary', ''),
];
</script>

<style scoped>
.container {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
}

.item-container {
	margin: 20px;
	border-radius: 20px;
	background-color: gray;
	width: 80%;
	max-width: 400px;
	aspect-ratio: 2/3;
}

@media(min-width: 800px) {
	.item-container {
		width: 40%;
		max-width: 550px;
	}
}
</style>