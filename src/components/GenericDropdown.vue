<template>
  <div tabindex="0" class="dropdown bg-base-300">
    <label
      class="dropdownToggle dropdown-bottom text-xl font-medium"
      @click="handleClick"
    >
      {{ title }}
      <span :class="{ arrowDown: !isOpen, arrowUp: isOpen }">▼</span>
    </label>
    <ul :class="{ dropdownList: isOpen, disabled: !isOpen }">
      <li v-for="(item, index) in items" :key="index" class="dropdownItem">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array(String),
    required: true,
  },
  keys: {
    type: Array(String),
    required: false,
  },
});

const isOpen = ref<boolean>(false);
function handleClick() {
  isOpen.value = !isOpen.value;
}
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  border-radius: 1rem;
  max-height: fit-content;
}

.dropdownToggle {
  cursor: pointer;
  padding: 1rem;
  display: flex;
  border: none;
  align-items: center;
}

.dropdownList {
  list-style: none;
  margin: 0;
  padding: 0;
  transition: opacity 0.3s ease-out;
  opacity: 1;
}
.disabled {
  opacity: 0;
  height: 0;
}

.dropdownItem {
  padding: 0.625rem 1rem;
}

.arrowUp,
.arrowDown {
  margin-left: auto;
  transition: transform 0.2s;
}

.arrowUp {
  transform: rotate(180deg);
}
</style>
