<template>
  <div>
    <label for="ign" class="sr-only"
      >What gear do you wish to use for this character?</label
    >

    <div class="relative">
      <textarea
        class="textarea textarea-bordered textarea-lg w-full max-w-xs"
        placeholder="What gear do you wish to use for this character?"
        v-model="gear"
      ></textarea>
    </div>
  </div>
  <p></p>
  <div>
    <label for="charname" class="sr-only"
      >A brief summary of the character</label
    >
    <div class="relative">
      <textarea
        class="textarea textarea-bordered textarea-lg w-full max-w-xs"
        placeholder="A brief summary of the character"
        v-model="summary"
      ></textarea>
      <label class="label">
        <span class="label-text text-secondary">
          If you are planning on writing a good amount of lore, please share a
          link above
        </span>
      </label>
    </div>
  </div>
  <div class="btn-group grid grid-cols-2">
    <button class="btn btn-outline" @click="previousStep()">
      Previous page
    </button>
    <button class="btn btn-outline" @click="nextStep()">
      Submit Application
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["nextStep", "previousStep"]);

const gear = ref<string>("");
const summary = ref<string>("");

function nextStep() {
  emit("nextStep", {
    step: 3,
    gear: gear.value,
    summary: summary.value,
  });
}

function previousStep() {
  emit("previousStep");
}
</script>
