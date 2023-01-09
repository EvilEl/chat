<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import io, { Socket } from "socket.io-client";
import Chart from "./components/Chat.vue";
import Join from "./components/Join.vue";
import { IMessage } from "./models/i-message";
import { formattedNames } from "../utils/";

const userMessage = ref<IMessage[]>([]);
const name = ref<string>("");
const socket = ref<Socket | null>(null);
const isCreateSocket = ref<boolean>(false);
onMounted(() => {
  const getName = localStorage.getItem("user");
  if (!getName) {
    return;
  }
  name.value = getName;
  if (name.value) {
    isCreateSocket.value = true;
    socket.value = io("http://localhost:8000", {
      transports: ["websocket"],
    });
  }
});

watch(socket, (instanceSocket) => {
  if (!instanceSocket) {
    return;
  }
  instanceSocket.on("chat-message", (data) => {
    userMessage.value = userMessage.value.concat(data);
  });
});

function onSendMessage(message: string): void {
  if (!socket.value || !message) {
    return;
  }
  const date = new Date();
  const newMessage = {
    message: message,
    name: formattedNames(name.value),
    date: `${date.getHours()} ${date.getMinutes()}`,
  };
  userMessage.value = userMessage.value.concat(newMessage);
  socket.value.emit("chat-message", newMessage);
}

function onJoin() {
  if (!name.value) {
    return;
  }
  localStorage.setItem("user", name.value);
  socket.value = io("http://localhost:8000", {
    transports: ["websocket"],
  });
  isCreateSocket.value = true;
}
</script>

<template>
  <div class="container">
    <Join v-if="!isCreateSocket" v-model:name="name" @join="onJoin" />
    <Chart v-else :user-message="userMessage" @sendMessage="onSendMessage" />
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/reset";
#app {
  background: #222222;
  width: 100%;
  height: 100vh;
}

.container {
  height: 100%;
  max-width: 1440px;
  padding: 0 30px;
  margin: 0 auto;
}
</style>
