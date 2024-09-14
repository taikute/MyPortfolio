<template>
  <input v-model="msg" @keyup.enter="sendMessage" />

  <h1>List message</h1>
  <ul>
    <li v-for="msg in msgList">{{ msg }}</li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from "vue";

const msg = ref<string>("");
const msgList = ref<string[]>([]);

const ws = new WebSocket("https://ice-wss.glitch.me/");

ws.onopen = () => {
  ws.send("Someone just connected!");
};

ws.onmessage = (msgEv) => {
  msgList.value.push(msgEv.data);
};

function sendMessage() {
  ws.send("New message: " + msg.value);
  msg.value = "";
}
</script>
