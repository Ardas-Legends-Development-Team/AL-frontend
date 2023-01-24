<script>
import { defineComponent } from "vue";
import TestNavbar from "@/components/TestNavbar.vue";

export default defineComponent({
  components: { TestNavbar },
});
</script>

<template>
  <TestNavbar />

  <router-view />
</template>
