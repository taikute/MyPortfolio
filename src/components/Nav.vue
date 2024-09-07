<template>
	<nav class="nav-bar">
		<RouterLink class="nav-header" to="/">Anh Tài</RouterLink>

		<div class="menu" :class="menuState">
			<div class="menu-btn" @click="menuBtn">
				<div class="bar1"></div>
				<div class="bar2"></div>
				<div class="bar3"></div>
			</div>

			<div class="menu-items">
				<RouterLink to="/about">Menu Item Longgggggg</RouterLink>
				<RouterLink to="/about">Menu Item</RouterLink>
				<RouterLink to="/about">Menu Item</RouterLink>
				<RouterLink to="/about">Menu Item</RouterLink>
				<RouterLink to="/about">Menu Item</RouterLink>
				<RouterLink to="/about">Menu Item</RouterLink>
			</div>
		</div>

		<div class="nav-items">
			<RouterLink to="/about">NavItem</RouterLink>
			<RouterLink to="/about">NavItem</RouterLink>
			<RouterLink to="/about">NavItem</RouterLink>
			<RouterLink to="/about">NavItem</RouterLink>
			<RouterLink to="/about">NavItem</RouterLink>
			<RouterLink to="/about">NavItem</RouterLink>
		</div>
	</nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const menuState = ref<string | null>(null)
function menuBtn() {
	if (menuState.value == null) {
		menuState.value = 'menu-show'
	} else {
		menuState.value = null
	}
}
</script>

<style scoped>
.nav-header {
	font-size: 25px;
	font-weight: 500;
	padding: 4px 8px;
}

.nav-items a,
.menu-items a {
	font-size: 20px;
	font-weight: 400;
}

.nav-items a {}

.menu-items a {
	margin: 4px;
	padding: 4px 20px 4px 8px;
	border-radius: 4px;
}

.menu-btn {
	cursor: pointer;
}

.menu-items {
	display: none;
	flex-direction: column;
	position: absolute;
	right: 8px;
	border: 2px solid;
	border-radius: 8px;
}

.nav-items {
	display: none;
}

.bar1,
.bar2,
.bar3 {
	width: 30px;
	height: 4px;
	background-color: white;
	margin: 6px 0;
	transition: 0.4s;
}

.menu-show .menu-btn .bar1 {
	transform: translate(0, 10px) rotate(-45deg);
}

.menu-show .menu-btn .bar2 {
	opacity: 0;
}

.menu-show .menu-btn .bar3 {
	transform: translate(0, -10px) rotate(45deg);
}

.menu-show .menu-items {
	display: flex;
}



.nav-bar {
	margin: 0 8px;
	height: 50px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.nav-items a {
	padding: 4px 4px;
	border-radius: 4px;
}

@media (min-width:768px) {
	.menu {
		display: none;
	}

	.nav-items {
		display: inline;
	}
}
</style>