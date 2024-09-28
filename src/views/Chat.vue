<template>
  <div class="chat-page">
    <div v-if="!userRef" class="welcome">
      <div class="head-text">Random chat</div>
      <div class="input-bar">
        <input v-model="nameRef" placeholder="Enter name" @keyup.enter="handleNameEnter" />
        <a class="btn btn-primary" @click="handleNameEnter">Chat</a>
      </div>
      <div class="privacy">*note: after click "chat" button, you will connect with random recipient!</div>
    </div>
    <div v-else class="auth">
      <div v-if="!userRef.rcptName" class="finding">
        <div class="head-text">Finding...</div>
        <a class="btn btn-primary" @click="handleDelete">Back</a>
      </div>
      <div v-else class="found">
        <div class="info-bar">
          <div class="rcpt-name">Chat with {{ userRef.rcptName }}</div>
          <a class="btn btn-primary" @click="handleLeave">New</a>
          <a class="btn btn-primary" @click="handleDelete">Reset</a>
        </div>
        <div class="divider"></div>
        <div class="message-list">
          <p v-for="msg in userRef.messages" class="item" :class="msg.self ? 'right' : 'left'">{{ msg.content }}</p>
        </div>
        <div class="input-bar">
          <input id="message-input" v-model="msgRef" @keyup.enter="handleSend" placeholder="Aa" @blur="takeFocus()" />
          <a class="btn btn-primary" @click="handleSend">Send</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import socket, { type User } from "@/chatSocket";
import { onBeforeMount, onBeforeUnmount, ref } from "vue";

const nameRef = ref("");
const userRef = ref<User>();
const msgRef = ref("");
const focusRef = ref<boolean>(true);

function takeFocus() {}

onBeforeMount(() => {
  const id = localStorage.getItem("id");
  if (id) {
    socket.auth = { id };
    socket.connect();
  }
});

onBeforeUnmount(() => {
  socket.disconnect();
});

function handleNameEnter() {
  if (socket.connected) {
    window.location.reload();
    return;
  }
  const id = localStorage.getItem("id");
  if (id) {
    socket.auth = { id };
  } else {
    socket.auth = { name: nameRef.value };
  }
  nameRef.value = "";
  socket.connect();
}

function handleLeave() {
  socket.emit("leave");
}

function handleDelete() {
  localStorage.removeItem("id");
  userRef.value = undefined;
  socket.emit("delete");
}

function handleSend() {
  if (!msgRef.value) {
    return;
  }
  socket.emit("private_message", msgRef.value);
  msgRef.value = "";
  document.getElementById("message-input")?.focus();
}

socket.on("user", (user) => {
  localStorage.setItem("id", user.id);
  userRef.value = user;
});

socket.on("pair", (rcptname) => {
  if (userRef.value) {
    userRef.value.rcptName = rcptname;
  }
});

socket.on("private_message", (msg) => {
  if (userRef.value) {
    userRef.value.messages.unshift(msg);
  }
});

socket.on("unpair", () => {
  if (userRef.value) {
    userRef.value.rcptName = undefined;
    userRef.value.messages = [];
  }
});

socket.on("connect_error", (err) => {
  localStorage.removeItem("id");
  userRef.value = undefined;
  console.log("Connect error: " + err.message);
});
</script>

<style scoped>
.chat-page {
  height: 100%;
}

.welcome {
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
}

.welcome .head-text {
  font-size: 40px;
  font-weight: 600;
  margin: 50px 0;
}

.welcome .input-bar {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.welcome .input-bar input {
  width: 50%;
  max-width: 350px;
  font-size: 20px;
  padding: 8px 12px;
  border-radius: 25px;
}

.welcome .input-bar a {
  margin-left: 10px;
  font-size: 25px;
}

.welcome .privacy {
  font-style: italic;
  margin: 10px 10px 0;
}

.auth {
  height: 100%;
}

.auth .finding {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.auth .finding .head-text {
  font-size: 40px;
}

.auth .finding a {
  margin-top: 20px;
  font-size: 20px;
}

.auth .found {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.auth .found .info-bar {
  height: 40px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.auth .found .info-bar .rcpt-name {
  font-size: 18px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth .found .message-list {
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
}

.auth .found .message-list .item {
  margin: 2px;
}

.auth .found .message-list .left {
  text-align: left;
  margin-left: 10px;
}

.auth .found .message-list .right {
  text-align: right;
  margin-right: 10px;
}

.auth .found .input-bar {
  height: 40px;
  padding: 10px 10px;
  display: flex;
}

.auth .found .input-bar input {
  font-size: 18px;
  flex: 1;
  padding: 0 10px;
  border-radius: 20px;
}

.auth .found .input-bar a {
  margin-left: 10px;
}

@media (min-width: 600px) {
  .auth .found {
    margin: 0 20%;
  }
  .auth .found .input-bar {
  height: 40px;
  padding: 10px 0;
  display: flex;
}
}
</style>
