<template>
	<div class="avata-container">
		<img alt="avata" src="@/assets/avata.jpg">
	</div>
	<div class="name-container">
		Nguyễn Anh Tài
	</div>
	<div class="intro-container">
		Passionate backend developer with [number] years of experience building scalable and robust web applications.
		Proficient in [languages, frameworks, databases]. Skilled in crafting efficient APIs and optimizing database
		performance.
	</div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.avata-container {
	text-align: center;
}

.avata-container img {
	width: 250px;
	height: 250px;
	border-radius: 50%;
	object-fit: cover;
}

.name-container {
	text-align: center;
	font-size: 30px;
	margin: 10px 0px;
}

.intro-container {
	font-size: 16px;
	line-height: 1.15;
}
</style>