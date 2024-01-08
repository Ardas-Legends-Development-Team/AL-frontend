<template>
  <input type="checkbox" id="declareWarModal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box max-w-2xl">
      <label
        for="declareWarModal"
        class="btn-m btn btn-circle btn-primary absolute right-2 top-2"
        >✕</label
      >
      <h2 class="text-lg font-bold">
        Declare war to {{ props.targetFactionName }}
      </h2>
      <input
        v-model="warName"
        type="text"
        placeholder="Name of the war"
        class="input input-bordered input-primary w-full max-w-xs"
      />
      <h3 class="text-lg font-bold">Are you sure you want to declare a war?</h3>
      <label
        for="declareWarModal"
        class="primary btn"
        @click="emit('confirm', { name: 'Declare War', value: warName })"
      >
        Confirm
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  targetFactionName: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["confirm"]);

const warName = ref("");
</script>

<style scoped></style>
