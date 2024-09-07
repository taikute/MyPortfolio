<template>
	<a class="btn btn-primary" @click="show = !show">{{ show }}</a>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>