<template>
  <div v-if="auth">
    <input v-model="username" @keyup.enter="usernameEnter" />
  </div>
  <div v-else hidden>
    <h1 style="text-align: center">Chat with stranger</h1>
    <div class="container">
      <div v-for="username in usernames" class="user-container">
        <div class="username-container">{{ username }}</div>
        <div>Online</div>
      </div>
    </div>
  </div>
  <div>
    <input class="chat-input" />
  </div>
</template>

<script setup lang="ts">
import socket from "@/socket";
import { onUnmounted, ref } from "vue";

const usernames = ["Tài", "Thư", "Ice", "Sibilo"];

const auth = ref(false);
const username = ref("");

function usernameEnter() {
  auth.value = true;
  socket.auth = { username: username.value };
  socket.connect();
}

socket.on("connect_error", (err) => {
  console.log(err.message);
  auth.value = false;
});

//Connected
socket.emit("private_message", "Hello there!", "Thư");

socket.on("private_message", (content, senderId) => {
  console.log(`New message from ${senderId}: ${content}`);
});

onUnmounted(() => {
  socket.disconnect();
});
</script>

<style scoped>
.user-container {
  margin: 10px;
  padding: 10px 20px;
  border-radius: 50vmin;
  background-color: darkolivegreen;
}

.username-container {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
}

.chat-input {
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
}
</style>
