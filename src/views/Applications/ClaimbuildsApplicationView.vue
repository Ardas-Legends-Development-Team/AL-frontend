<template>
  <section class="relative flex flex-wrap lg:h-screen lg:items-center">
    <div class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
      <div class="mx-auto max-w-lg text-center">
        <h1 class="text-2xl font-bold sm:text-3xl">Claimbuild Application</h1>

        <p class="mt-4 text-gray-500">
          Please read claimbuild rules on Discord before submitting
        </p>
      </div>

      <div class="mx-auto mt-8 mb-0 max-w-3xl space-y-4">
        <component
          :is="steps[currentStep]"
          @nextStep="nextStep"
          @previousStep="previousStep"
        ></component>
        <progress
          class="progress progress-primary w-full"
          :value="formProgress"
          max="100"
        ></progress>
      </div>
    </div>

    <div class="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
      <img
        alt="roleplay image"
        :src="stepsImages[currentStep].toString()"
        class="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import ClaimbuildsApplicationStep0 from "@/components/applications/Claimbuilds/ClaimbuildsApplicationStep0.vue";
import ClaimbuildsApplicationStep1 from "@/components/applications/Claimbuilds/ClaimbuildsApplicationStep1.vue";
import ClaimbuildsApplicationStep2 from "@/components/applications/Claimbuilds/ClaimbuildsApplicationStep2.vue";
import ClaimbuildsApplicationStep3 from "@/components/applications/Claimbuilds/ClaimbuildsApplicationStep3.vue";
import ClaimbuildsApplicationStep4 from "@/components/applications/Claimbuilds/ClaimbuildsApplicationStep4.vue";
import { useClaimbuildsFormStore } from "@/stores/formStores";
import { ApplicationApiClient } from "@/ts/ApiService/ApplicationApiClient";
import { ErrorHandler } from "@/ts/ErrorHandler";

const router = useRouter();
const steps = [
  ClaimbuildsApplicationStep0,
  ClaimbuildsApplicationStep1,
  ClaimbuildsApplicationStep2,
  ClaimbuildsApplicationStep3,
  ClaimbuildsApplicationStep4,
];
const stepsImages = ref<String[]>([
  "https://media.discordapp.net/attachments/1068863871772790865/1070856198196314182/Jorundr_in_the_style_of_charlie_bowater_full_body_pose_24mn_blo_0f80d875-0ac4-48d5-bba7-7081157571d7.png?width=905&height=1357",
  "https://cdn.discordapp.com/attachments/1068863871772790865/1070856200062779483/hkjj_the_lord_of_the_rings_sauron_--v_4_b4e77a28-5d4d-4fec-9db3-97f661a0e12e.png",
  "https://media.discordapp.net/attachments/1068863871772790865/1070856198196314182/Jorundr_in_the_style_of_charlie_bowater_full_body_pose_24mn_blo_0f80d875-0ac4-48d5-bba7-7081157571d7.png?width=905&height=1357",
  "https://cdn.discordapp.com/attachments/1068863871772790865/1070856200062779483/hkjj_the_lord_of_the_rings_sauron_--v_4_b4e77a28-5d4d-4fec-9db3-97f661a0e12e.png",
  "https://media.discordapp.net/attachments/1068863871772790865/1070856198196314182/Jorundr_in_the_style_of_charlie_bowater_full_body_pose_24mn_blo_0f80d875-0ac4-48d5-bba7-7081157571d7.png?width=905&height=1357",
]);
const formProgress = ref(15);
const currentStep = ref(0);
const formData = useClaimbuildsFormStore();

function nextStep(formInput: any) {
  switch (formInput.step) {
    case 1:
      formData.builtBy = formInput.builtBy
        .split(",")
        .map((x: string) => x.trim());
      formData.regionId = formInput.regionId;
      formData.claimbuildName = formInput.claimbuildName;
      formData.coordinate = formInput.coordinate;
      break;
    case 2:
      formData.type = formInput.type;
      formData.houses = formInput.houses;
      break;
    case 3:
      formData.productionSites = formInput.productionSites;
      formData.specialBuildings = formInput.specialBuildings;
      break;
    case 4:
      formData.traders = formInput.traders;
      formData.siege = formInput.siege;
      ApplicationApiClient.createClaimbuildApplication(formData)
        .then(() => {
          router.push({
            name: "ClaimBuildsApplicationEnd",
          });
        })
        .catch((error) => {
          ErrorHandler.throwError(error.response.data.message);
        });
      return;
    default:
      // do something
      break;
  }
  currentStep.value++;
  formProgress.value += 25;
}

function previousStep() {
  currentStep.value--;
  formProgress.value -= 25;
}
</script>
