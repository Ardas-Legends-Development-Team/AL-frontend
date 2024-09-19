<template>
  <div
    v-if="!componentIsReady"
    :class="`${!componentIsReady ? 'skeleton' : 'skeletonHide'} ${widthClass}`"
  />
</template>
<script setup lang="ts">
defineProps({
  widthClass: {
    type: String,
    required: true,
  },
  componentIsReady: {
    type: Boolean,
    default: false,
  },
});
</script>
<style lang="css" scoped>
.skeleton {
  width: 100%;
  height: 100%;
  border-radius: 25px;
  animation: wave 1s infinite;
  background-color: transparent;
  position: absolute;
  top: 0;
}
.skeletonHide {
  display: none;
  animation: none;
  opacity: 0;
}
@keyframes wave {
  0% {
    background-color: #2b2b2b;
  }
  50% {
    background-color: #1a1a1a;
  }
  100% {
    background-color: #2b2b2b;
  }
}
</style>
