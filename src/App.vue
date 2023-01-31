<script>
import { defineComponent } from "vue";
import TestNavbar from "@/components/navbars/HorizontalNavbar.vue";
import VerticalNavbar from "@/components/navbars/VerticalNavbar.vue";

export default defineComponent({
  components: { VerticalNavbar, TestNavbar },
});
</script>

<template>
  <header>
    <TestNavbar />
    <VerticalNavbar />
  </header>
  <body>
    <div class="relative z-0 mx-64 bg-base-300">
      <router-view />
    </div>
  </body>
  <footer></footer>
</template>
