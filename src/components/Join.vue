<script lang="ts" setup>
import { computed } from "vue";

const emit = defineEmits<{
  (e: "update:name", name: string): void;
  (e: "join"): void;
}>();

const props = defineProps({
  name: {
    type: String,
    default: "",
  },
});

const newName = computed({
  get(): string {
    return props.name;
  },
  set(value: string): void {
    emit("update:name", value);
  },
});

function onJoin(): void {
  emit("join");
}
</script>
<template>
  <div class="join">
    <input class="join__input" type="text" v-model="newName" />
    <button class="join__button" @click="onJoin">Join</button>
  </div>
</template>

<style lang="scss">
.join {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &__input,
  &__button {
    align-items: center;
    border: none;
    border-radius: 2px;
    box-sizing: border-box;
    cursor: pointer;
    font-family: inherit;
    font-weight: 600;
    display: inline-flex;
    justify-content: center;
    min-width: 6.4rem;
    max-width: 480px;
    overflow: hidden;
    text-align: center;
    vertical-align: middle;
    outline: none;
  }
  &__button {
    background: #0a66c2;
    margin-left: 1rem;
    color: #fff;
  }
}
</style>
