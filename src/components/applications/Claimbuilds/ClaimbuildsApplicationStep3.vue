<template>
  <div>
    <label for="shops" class="sr-only"
      >What Shops or Production Sites are Present?</label
    >

    <div class="relative">
      <label class="label">
        <span class="label-text text-secondary">
          Please list all productions sites or shops in the build. Remember each
          site requires 4 houses to activate it.
        </span>
      </label>
      <textarea
        class="textarea textarea-bordered textarea-lg w-full max-w-xs"
        placeholder="What Shops or Production Sites are Present?"
        v-model="shops"
      ></textarea>
    </div>
  </div>
  <p></p>
  <div>
    <label for="extraInfo" class="sr-only">Extra Information</label>
    <div class="relative">
      <label class="label">
        <span class="label-text text-secondary">
          Not required, can be lore or locations of things admins might miss.
        </span>
      </label>
      <textarea
        class="textarea textarea-bordered textarea-lg w-full max-w-xs"
        placeholder="Extra Information"
        v-model="extraInfo"
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
const shops = ref<string>(formData.shops);
const extraInfo = ref<string>(formData.extraInfo);
const isFormFilled = computed(() => {
  return shops.value;
});

function nextStep() {
  emit("nextStep", {
    step: 3,
    shops: shops.value,
    extraInfo: extraInfo.value,
  });
}

function previousStep() {
  emit("previousStep");
}
</script>
