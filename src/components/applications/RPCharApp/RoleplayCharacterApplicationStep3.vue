<template>
  <div>
    <label for="ign" class="sr-only"
      >What gear do you wish to use for this character?</label
    >

    <label class="label">
      <span class="label-text text-secondary">
        Please refer to the Gear Rules on Discord before filling out this
        section. We do not give out weapons or armour, the gear you list in your
        app is for our records. If you are requesting to use gear that is out of
        your faction's set, please provide a good reason as to why your
        character has it. We will not accept "easy" excuses like "killed an elf"
        or "won it in a tournament" Please list all weapons and armours in your
        app. If you list a sword and spear, you will only be able to use these
        in PvP. No exceptions.
      </span>
    </label>
    <div class="relative">
      <textarea
        class="textarea textarea-bordered textarea-lg w-full max-w-xs"
        placeholder="What gear do you wish to use for this character?"
        v-model="gear"
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
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoleplayCharacterFormStore } from "@/stores/formStores";

const emit = defineEmits(["nextStep", "previousStep"]);
const formData = useRoleplayCharacterFormStore();
const gear = ref<string>(formData.gear);

const isFormFilled = computed(() => {
  return gear.value;
});

function nextStep() {
  emit("nextStep", {
    step: 3,
    gear: gear.value,
  });
}

function previousStep() {
  emit("previousStep");
}
</script>
