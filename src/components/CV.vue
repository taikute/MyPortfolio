<template>
	<div class="container">
		<a :href="cvUrl" class="btn btn-primary">Download my CV</a>
		<img src="../assets/nguyenanhtai_cv.jpg" alt="cv">
	</div>
</template>

<script setup lang="ts">
const cvUrl: string = 'https://drive.google.com/uc?export=download&id=1DRf-FjqWmOdeP-UEAaTdsTKGESz4oBJ2';
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

a {
	font-size: 20px;
	font-weight: 500;
	margin-top: 20px;
	padding: 10px 20px;
	border-radius: 50ch;
}

img {
	margin-top: 20px;
	max-width: 800px;
	width: 100%;
}

@media (min-width: 992px) {
	a {
		font-size: 25px;
	}
}
</style>