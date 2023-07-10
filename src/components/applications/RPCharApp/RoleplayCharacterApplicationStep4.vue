<template>
  <div>
    <label for="charname" class="sr-only"
      >Link to your character lore document</label
    >
    <div class="relative">
      <label class="label">
        <span class="label-text text-secondary">
          Write the link of a shareable online document (Google Docs etc.)
        </span>
      </label>
      <textarea
        class="textarea textarea-bordered textarea-lg w-full max-w-xs"
        placeholder="A brief summary of the character"
        v-model="linkToLore"
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
import { useRoleplayCharacterFormStore } from "@/stores/formStores";

const emit = defineEmits(["nextStep", "previousStep"]);
const formData = useRoleplayCharacterFormStore();
const linkToLore = ref<string>(formData.linkToLore);

const isFormFilled = computed(() => {
  return linkToLore.value;
});

function nextStep() {
  emit("nextStep", {
    step: 4,
    linkToLore: linkToLore.value,
  });
}

function previousStep() {
  emit("previousStep");
}
</script>
