<template>
  <div v-if="!userId">
    <input v-model="userInput" @keyup.enter="usernameEnter" />
  </div>
  <div v-else class="container">
    <div v-if="isLarge || !recipientSelected" class="left-container">
      <div style="text-align: center; font-size: 30px">Chat with stranger</div>
      <div class="user-list-container">
        <div
          v-for="[id, connected] in userState"
          class="user-container"
          @click="onUserSelected(id)"
        >
          <div class="username-container">
            {{ id }}<span v-if="userId == id"> (yourself)</span>
          </div>
          <div v-if="connected">Online</div>
          <div v-else>Offline</div>
        </div>
      </div>
    </div>
    <div class="right-container">
      <div v-if="recipientSelected" class="inbox-container">
        <div class="info-container">{{ recipientSelected }}</div>
        <div class="message-list-container">
          <div v-for="message in messageList" class="message-container">
            <span> {{ message }}</span>
          </div>
        </div>
        <div class="input-container">
          <input
            v-model="messageInput"
            class="chat-input"
            placeholder="Type some thing ..."
            @keyup.enter="onSend"
          />
          <a class="send-btn btn btn-primary" @click="onSend">Send</a>
        </div>
      </div>
      <div v-else-if="isLarge">Chosse user to chat</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import socket, { Message } from "@/socket";
import { onUnmounted, ref } from "vue";

const isLarge = ref(window.innerWidth >= 768);
window.addEventListener("resize", () => {
  isLarge.value = window.innerWidth >= 768;
});

const userId = ref("");
const userInput = ref("");
const recipientSelected = ref("");
const messageInput = ref("");
const userState = ref<Map<string, boolean>>(new Map());
const messageList = ref<Message[]>([]);

const storageId = localStorage.getItem("userId");
if (storageId) {
  socket.auth = { storageId };
  socket.connect();
  userId.value = storageId;
}

function onUserSelected(_userId: string) {
  recipientSelected.value = _userId;
}

function onSend() {
  if (messageInput.value && recipientSelected.value) {
    socket.emit("private_message", recipientSelected.value, messageInput.value);
    messageList.value = [
      ...messageList.value,
      new Message(userId.value, recipientSelected.value, messageInput.value),
    ];
    messageInput.value = "";
  }
}

function usernameEnter() {
  socket.auth = { userId: userInput.value };
  socket.connect();
  userId.value = userInput.value;
  localStorage.setItem("userId", userId.value);
}

socket.on("connect_error", (err) => {
  console.log(err.message);
  userId.value = "";
  localStorage.removeItem("userId");
});

//Connected
socket.on("data", (_userState, _messageList) => {
  userState.value = new Map(_userState);
  messageList.value = _messageList;
});

socket.on("user_connected", (id) => {
  userState.value.set(id, true);
});

socket.on("private_message", ({ senderId, recipientId, content }) => {
  messageList.value = [
    ...messageList.value,
    new Message(senderId, recipientId, content),
  ];
});

onUnmounted(() => {
  socket.disconnect();
});
</script>

<style scoped>
.user-container {
  cursor: pointer;
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

.inbox-container {
  margin: 0 8px;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
}

.info-container {
  height: 50px;
  background-color: darkolivegreen;
}

.message-list-container {
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
}

.message-container {
  margin: 5px;
}

.input-container {
  height: 40px;
  display: flex;
  padding: 10px 0;
  background-color: darkslategrey;
}

.chat-input {
  border-radius: 25px;
  padding: 0 10px;
  margin-right: 10px;
  flex: 1;
}

@media (min-width: 768px) {
  .container {
    display: flex;
  }
  .left-container {
    width: 40%;
    max-width: 400px;
  }
  .right-container {
    flex: 1;
  }
}
</style>
