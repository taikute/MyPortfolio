<template>
	<div class="container">
		<div class="avata-container">
			<img alt="avata" src="@/assets/avata.jpg">
		</div>
		<div class="name-container">
			Nguyễn Anh Tài
		</div>
		<div class="intro-container">
			I'm a passionate <b>Software Engineer</b> from Vietnam.
		</div>
		<div class="contact-container">
			<i class="fa-solid fa-phone" @click="redirect('tel:0389653102')"></i>
			<i class="fa-solid fa-envelope" @click="redirect('mailto:anhtai05102002@gmail.com')"></i>
			<i class="fa-brands fa-github" @click="newTab('https://github.com/taikute')"></i>
			<i class="fa-brands fa-facebook" @click="newTab('https://www.facebook.com/profile.php?id=100034716938533')"></i>
		</div>
	</div>
</template>

<script setup lang="ts">
function newTab(url: string) {
	window.open(url, '_blank');
}
function redirect(url: string) {
	window.location.href = url;
}
</script>

<style scoped>
.avata-container {
	margin: 30px 0 0;
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
	margin: 10px 0 0;
}

.intro-container {
	margin: 20px 0 0;
	font-size: 16px;
	line-height: 1.15;
}

.contact-container {
	display: flex;
	justify-content: space-around;
	margin: 30px 0 0;
}

.contact-container i {
	font-size: 30px;
	padding: 5px 20px;
	border-radius: 8px;
	cursor: pointer;
}

.contact-container i:hover {
	background-color: var(--dark-text-hover);
}

@media (min-width: 480px) {}
</style>