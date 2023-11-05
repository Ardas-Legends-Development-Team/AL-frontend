<template>
  <div class="flex flex-col justify-center">
    <div class="flex flex-row justify-center m-3">
      <div class="flex flex-row basis-1/3 flex-wrap">
        <img
          class="w-16 h-32"
          :src="attackerFactionBanner"
          alt="faction banner"
        />
      </div>
      <h3
        class="basis-1/3 text-xl text-accent font-bold text-center my-10 mx-2"
      >
        {{ war.nameOfAttacker }} VS {{ war.nameOfDefender }}
      </h3>
      <div class="flex flex-row basis-1/3 flex-wrap">
        <img
          class="w-16 h-32"
          :src="defenderFactionBanner"
          alt="faction banner"
        />
      </div>
    </div>
    <p class="basis-1/3 text-primary font-bold text-center mb-2">
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
  attackerFactionBanner.value = factionNameToBanner(props.war.nameOfAttacker);
  defenderFactionBanner.value = factionNameToBanner(props.war.nameOfDefender);
}

populateWarBanners();
</script>
