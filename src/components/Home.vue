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
			<div class="phone">Phone</div>
			<div class="email">Email</div>
			<div class="github">Github</div>
			<div class="facebook">Facebook</div>
		</div>

	</div>
</template>

<script setup lang="ts">

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
	margin: 30px 0 0;
	display: flex;
	flex-wrap: wrap;
}

.contact-container div {
	text-align: center;
	width: 50%;
	padding: 8px 0;
	border: 2px solid;
}

@media (min-width: 480px) {
	.container {
		display: none;
	}
}
</style>