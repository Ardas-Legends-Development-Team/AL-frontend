<template>
  <div
    class="blurred-img"
    :class="`lazy-img-container ${!!paddingLimiterClass ? paddingLimiterClass : 'fullPadding'} ${insideClasses} ${loaded ? 'loaded' : ''}`"
    :style="'background-image:url(' + imageData.src + '?profile=Lowres-Image)'"
  >
    <ImageSkeleton
      :width-class="insideClasses"
      :component-is-ready="componentReady || loaded"
    />
    <img
      :class="insideClasses"
      :src="imageData.src + '?profile=Normal-Image'"
      :alt="imageData.alt"
      loading="lazy"
      @load="loaded = true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getCorrectImageData, isFactionEvil } from "@/ts/utilities";
import { usePlayerStore } from "@/stores/playerStores";
import ImageSkeleton from "./ImageSkeleton.vue";

const props = defineProps({
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
  paddingLimiterClass: {
    type: String,
    required: false,
    default: "",
  },
});

const imageData = getCorrectImageData(
  isFactionEvil(usePlayerStore().faction),
  props,
);

const loaded = ref(false);
const componentReady = ref(false);
const img = new Image();
img.addEventListener("load", () => {
  componentReady.value = true;
});
img.src = imageData.src;
</script>

<style scoped>
.lazy-img-container {
  position: relative;
  width: 100%;
}
.fullPadding {
  padding-top: 100%;
}
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
  position: absolute;
  top: 0;
  opacity: 0;
  transition: opacity 250ms ease-in-out;
}

.blurred-img.loaded img {
  opacity: 1;
  position: absolute;
  top: 0;
}
</style>
