<template>
  <div
    class="blurred-img"
    :class="loaded ? 'loaded' : ''"
    :style="'background-image:url(' + props.src + '?profile=Lowres-Image)'"
  >
    <img
      :src="props.src + '?profile=Normal-Image'"
      :alt="props.alt"
      loading="lazy"
      @load="loaded = true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
});

const loaded = ref(false);
</script>

<style scoped>
.blurred-img {
  background-repeat: no-repeat;
  background-size: cover;
}
.blurred-img::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  animation: pulse 2.5s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 0;
  }
}

.blurred-img.loaded::before {
  animation: none;
  content: none;
}

.blurred-img img {
  opacity: 0;
  transition: opacity 250ms ease-in-out;
}

.blurred-img.loaded img {
  opacity: 1;
}
</style>
