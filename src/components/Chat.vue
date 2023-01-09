<script lang="ts" setup>
import { IMessage } from "@/models/i-message";
import { PropType, ref } from "vue";

const emit = defineEmits<{
  (e: "sendMessage", message: string): void;
}>();

const props = defineProps({
  userMessage: {
    type: Array as PropType<IMessage[]>,
  },
});

const message = ref<string>("");

function onSendMessage(): void {
  emit("sendMessage", message.value);
}
</script>
<template>
  <div class="chat">
    <div class="chat__container">
      <div v-for="user in props.userMessage" :key="user.message" class="chat__user">
        <div class="chat__name">
          {{ user.name }}
          <div class="chat__date">{{ user.date }}</div>
        </div>
        <div class="chat__message">
          {{ user.message }}
        </div>
      </div>
    </div>
    <div class="chat__controllers">
      <input class="chat__input" type="text" v-model="message" />
      <button class="chat__button" @click="onSendMessage">Send message</button>
    </div>
  </div>
</template>
<style lang="scss">
.chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  &__container {
    margin-top: 1rem;
  }
  &__user {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 0.8rem;
    line-height: 15px;
    color: #fff;
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
  &__name {
    color: #6a9edb;
    display: flex;
    align-items: baseline;
    gap: 1rem;
    font-size: 1rem;
  }
  &__date {
    color: #d2d5d8;
    font-size: 0.6rem;
  }
  &__message {
    margin-top: 0.3rem;
  }
  &__controllers {
    margin-bottom: 3rem;
    display: flex;
    flex-direction: column;
  }
  &__input {
    border: none;
  }
  &__button {
    margin-top: 0.5rem;
  }
}
</style>
