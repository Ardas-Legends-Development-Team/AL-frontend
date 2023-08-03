<template>
  <div
    v-if="!isEvil"
    class="blurred-img"
    :class="loaded ? 'loaded' : ''"
    :style="'background-image:url(' + props.goodSrc + '?profile=Lowres-Image)'"
  >
    <img
      :class="insideClasses"
      :src="props.goodSrc + '?profile=Normal-Image'"
      :alt="props.goodAlt"
      loading="lazy"
      @load="loaded = true"
    />
  </div>
  <div
    v-else
    class="blurred-img"
    :class="loaded ? 'loaded' : ''"
    :style="'background-image:url(' + props.evilSrc + '?profile=Lowres-Image)'"
  >
    <img
      :class="insideClasses"
      :src="props.evilSrc + '?profile=Normal-Image'"
      :alt="props.evilAlt"
      loading="lazy"
      @load="loaded = true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  isEvil: {
    type: Boolean,
    required: true,
  },
  goodSrc: {
    type: String,
    required: true,
  },
  evilSrc: {
    type: String,
    required: true,
  },
  goodAlt: {
    type: String,
    required: true,
  },
  evilAlt: {
    type: String,
    required: true,
  },
  insideClasses: {
    type: String,
    required: false,
    default: "",
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
