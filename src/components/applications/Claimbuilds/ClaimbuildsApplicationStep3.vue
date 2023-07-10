<template>
  <div>
    <label for="traders" class="sr-only">What traders are present?</label>

    <div class="relative">
      <label class="label">
        <span class="label-text text-secondary">
          Please list all the traders if there are any
        </span>
      </label>
      <textarea
        class="textarea textarea-bordered textarea-lg w-full max-w-xs"
        placeholder="What Shops or Production Sites are Present?"
        v-model="traders"
      ></textarea>
    </div>
  </div>
  <p></p>
  <div v-if="formData.hasWorkshop()">
    <label for="siege" class="sr-only">Siege Equipment</label>
    <div class="relative">
      <label class="label">
        <span class="label-text text-secondary">
          Since you have a workshop, what siege equipment do you have?
        </span>
      </label>
      <textarea
        class="textarea textarea-bordered textarea-lg w-full max-w-xs"
        placeholder="Siege equipment"
        v-model="siege"
      ></textarea>
    </div>
  </div>
  <div class="btn-group grid grid-cols-2">
    <button class="btn btn-outline" @click="previousStep()">
      Previous page
    </button>
    <button
      :disabled="!isFormFilled"
      class="btn btn-outline"
      @click="nextStep()"
    >
      Submit Application
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useClaimbuildsFormStore } from "@/stores/formStores";

const emit = defineEmits(["nextStep", "previousStep"]);
const formData = useClaimbuildsFormStore();
const traders = ref<string>(formData.traders);
const siege = ref<string>(formData.siege);
const isFormFilled = computed(() => {
  return traders.value;
});

function nextStep() {
  emit("nextStep", {
    step: 3,
    traders: traders.value,
    siege: siege.value,
  });
}

function previousStep() {
  emit("previousStep");
}
</script>
