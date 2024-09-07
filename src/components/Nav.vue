<template>
	<nav class="navbar">

		<RouterLink class="nav-header" to="/">Anh Tài</RouterLink>

		<div class="menu" :class="menuState">
			<div class="menu-btn" @click="menuBtn">
				<div class="bar1"></div>
				<div class="bar2"></div>
				<div class="bar3"></div>
			</div>

			<div class="menu-items">
				<RouterLink to="/about">Menu Item</RouterLink>
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
		// Open
	} else {
		menuState.value = null
		// Close
	}
}
</script>

<style scoped>
.menu-btn {
	cursor: pointer;
}

.menu-items {
	display: none;
	flex-direction: column;
	position: absolute;
	right: 0px;
	background-color: black;
	border: 2px solid;
	border-radius: 4px;
	padding: 4px;
}

.nav-items {
	display: none;
}

.bar1,
.bar2,
.bar3 {
	width: 35px;
	height: 5px;
	background-color: white;
	margin: 6px 0;
	transition: 0.4s;
}

.menu-show .menu-btn .bar1 {
	transform: translate(0, 11px) rotate(-45deg);
}

.menu-show .menu-btn .bar2 {
	opacity: 0;
}

.menu-show .menu-btn .bar3 {
	transform: translate(0, -11px) rotate(45deg);
}

.menu-show .menu-items {
	display: flex;
}

@media (min-width:768px) {
	.menu {
		display: none;
	}

	.nav-items {
		display: inline;
	}
}

.nav-header {
	font-size: 18px;
	font-weight: 500;
	padding: 4px 8px;
}

.navbar {
	margin: 0 8px;
	height: 50px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.nav-items a {
	font-size: 15px;
	padding: 4px 4px;
	border-radius: 4px;
}
</style>