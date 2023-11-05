<template>
  <transition name="fade">
    <div v-show="showButton" class="bottom-8 right-8 fixed cursor-pointer">
      <a
        class="btn btn-primary inline-block mask mask-circle"
        @click="scrollToTop"
      >
        <span class="sr-only">Back to top</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-5"
          viewBox="0 0 20 5"
          fill="#fffff"
        >
          <path
            fill-rule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const showButton = ref(false);

const checkScroll = () => {
  showButton.value = window.scrollY > window.innerHeight * 0.2;
};

onMounted(() => {
  window.addEventListener("scroll", checkScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll);
});

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
