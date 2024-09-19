<template>
  <div v-if="!userId">
    <input v-model="userInput" @keyup.enter="usernameEnter" />
  </div>
  <div v-else class="container">
    <div v-if="isLarge || !recipientSelected" class="left-container">
      <div style="text-align: center; font-size: 30px">Chat with stranger</div>
      <div class="user-list-container">
        <div v-if="!users">Loading...</div>
        <div
          v-else
          v-for="[id, data] in Object.entries(users)"
          class="user-container"
          @click="onUserSelected(id)"
        >
          <div class="username-container">
            {{ id }}<span v-if="userId == id"> (yourself)</span>
          </div>
          <div v-if="data.connected">Online</div>
          <div v-else>Offline</div>
        </div>
      </div>
    </div>
    <div class="right-container">
      <div v-if="recipientSelected" class="inbox-container">
        <div class="info-container">{{ recipientSelected }}</div>
        <div class="message-list-container">
          <div v-for="message in messages" class="message-container">
            <span>({{ message.senderId }}): {{ message.content }}</span>
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
import socket, { Message, type UserMap } from "@/socket";
import { onUnmounted, ref } from "vue";

const isLarge = ref(window.innerWidth >= 768);
window.addEventListener("resize", () => {
  isLarge.value = window.innerWidth >= 768;
  console.log(innerWidth);
  console.log();
});

const userId = ref<string>();
const userInput = ref("");
const recipientSelected = ref<string>();
const messageInput = ref("");
const users = ref<UserMap>();
const messages = ref<Message[]>();

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
  if (!userId.value) {
    alert("Error, page reloading!");
    window.location.reload();
    return;
  }
  if (messageInput.value && recipientSelected.value) {
    socket.emit("private_message", recipientSelected.value, messageInput.value);
    const message = new Message(
      userId.value,
      recipientSelected.value,
      messageInput.value
    );
    if (messages.value) {
      messages.value = [message, ...messages.value];
    } else {
      messages.value = [message];
    }
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
  userId.value = undefined;
  localStorage.removeItem("userId");
  alert("Error, page reloading!");
  window.location.reload();
});

//Connected
socket.on("data", (_userState, _messageList) => {
  users.value = _userState;
  messages.value = _messageList;
});

socket.on("user_connected", (id) => {
  if (!users.value) {
    alert("Error, page reloading!");
    window.location.reload();
    return;
  }
  users.value[id];
});

socket.on("private_message", (message) => {
  if (messages.value) {
    messages.value = [message, ...messages.value];
  } else {
    messages.value = [message];
  }
});

onUnmounted(() => {
  socket.disconnect();
});
</script>

<style scoped>
.container,
.inbox-container {
  height: 100%;
}

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
