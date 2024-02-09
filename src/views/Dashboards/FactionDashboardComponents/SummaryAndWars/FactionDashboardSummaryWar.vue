<template>
  <div class="flex flex-col justify-center">
    <div class="m-3 flex flex-row justify-center">
      <div class="flex basis-1/3 flex-row flex-wrap">
        <img
          class="h-32 w-16"
          :src="attackerFactionBanner"
          alt="faction banner"
        />
      </div>
      <h3
        class="mx-2 my-10 basis-1/3 text-center text-xl font-bold text-accent"
      >
        {{ war.initialAttacker }} VS {{ war.initialDefender }}
      </h3>
      <div class="flex basis-1/3 flex-row flex-wrap">
        <img
          class="h-32 w-16"
          :src="defenderFactionBanner"
          alt="faction banner"
        />
      </div>
    </div>
    <p class="mb-2 basis-1/3 text-center font-bold text-primary">
      Started {{ war.startDate }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { factionNameToBanner } from "@/ts/factionBannersEnum";
import { ref } from "vue";
import { War } from "@/ts/types/War";

const props = defineProps({
  war: {
    type: Object as () => War,
    required: true,
  },
});

const attackerFactionBanner = ref<string>("");
const defenderFactionBanner = ref<string>("");

function populateWarBanners() {
  attackerFactionBanner.value = factionNameToBanner(props.war?.initialAttacker);
  defenderFactionBanner.value = factionNameToBanner(props.war?.initialDefender);
}

populateWarBanners();
</script>
