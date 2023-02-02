<script setup lang="ts">
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button id="increment-button" class="btn btn-secondary" @click="count++">
      count is {{ count }}
    </button>
  </div>

  <p>Install Volar in your IDE for a better DX</p>
  <p class="read-the-docs">
    Click on the Vite and Vue logos to learn moreClick on the Vite and Vue logos
    to learn moreClick on the Vite and Vue logos to learn moreClick on the Vite
    and Vue logos to learn moreClick on the Vite and Vue logos to learn more
  </p>
</template>
