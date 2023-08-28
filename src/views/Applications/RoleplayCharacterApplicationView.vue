<template>
  <section class="relative flex flex-wrap lg:h-screen lg:items-center">
    <div class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
      <div class="mx-auto max-w-lg text-center">
        <h1 class="text-2xl font-bold sm:text-3xl">
          Roleplay Character Application
        </h1>

        <p class="mt-4 text-gray-500">
          Please read roleplay rules on Discord before submitting an
          application.
        </p>
      </div>

      <div class="mx-auto mt-8 mb-0 max-w-md space-y-4">
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
      <LazyLoadedImage
        :key="stepsImages[currentStep].evilSrc"
        :inside-classes="'absolute inset-0 h-full w-full object-cover'"
        :evil-alt="stepsImages[currentStep].evilAlt"
        :good-alt="stepsImages[currentStep].goodAlt"
        :evil-src="stepsImages[currentStep].evilSrc"
        :good-src="stepsImages[currentStep].goodSrc"
        :is-evil="isFactionEvil(usePlayerStore().faction)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import RoleplayCharacterApplicationStep1 from "@/views/Applications/RoleplayApplicationComponents/RoleplayCharacterApplicationStep1.vue";
import RoleplayCharacterApplicationStep2 from "@/views/Applications/RoleplayApplicationComponents/RoleplayCharacterApplicationStep2.vue";
import RoleplayCharacterApplicationStep3 from "@/views/Applications/RoleplayApplicationComponents/RoleplayCharacterApplicationStep3.vue";
import RoleplayCharacterApplicationStep4 from "@/views/Applications/RoleplayApplicationComponents/RoleplayCharacterApplicationStep4.vue";
import { useRoleplayCharacterFormStore } from "@/stores/formStores";
import { ApplicationApiClient } from "@/ts/ApiService/ApplicationApiClient";
import { isFactionEvil } from "@/ts/utilities";
import { usePlayerStore } from "@/stores/playerStores";
import LazyLoadedImage from "@/components/images/LazyLoadedImage.vue";

const router = useRouter();
const steps = [
  RoleplayCharacterApplicationStep1,
  RoleplayCharacterApplicationStep2,
  RoleplayCharacterApplicationStep3,
  RoleplayCharacterApplicationStep4,
];

const stepsImages = ref<
  { evilAlt: string; goodAlt: string; evilSrc: string; goodSrc: string }[]
>([
  {
    evilAlt: "sauron wearing heavy black armor",
    goodAlt: "gandalf holding a candle in the dark",
    evilSrc:
      "https://ateettea.sirv.com/Applications/Roleplay/Lord_Sauron_in_Armor_and_Balrog_d8f7c35e-93ae-4ebc-8fc2-bc57bab61cad.png",
    goodSrc:
      "https://ateettea.sirv.com/Applications/Roleplay/20Cent_Gandalf_is_the_lord_of_the_ring_realistic_volumetric_lig_fb68c12b-7194-4b08-816b-23a4cf406651.png",
  },
  {
    evilAlt: "black orc with red eyes in heavy iron armour with iron mask",
    goodAlt: "gondor knight on a white horse",
    evilSrc:
      "https://ateettea.sirv.com/Applications/Roleplay/6b7aabd3-62d5-42db-b0c7-f52e0e2bc6bd.jpg",
    goodSrc:
      "https://ateettea.sirv.com/Applications/Roleplay/Stefano-da-Urbino-on-Midjourney_HD__photorealistic__handsome_st_3449577a-7085-4e93-9fb2-eccb3d96e2a5.png",
  },
  {
    evilAlt: "haradrim noble soldier wearing red turban with blood on face",
    goodAlt: "wood elf armoured archer inside forest",
    evilSrc:
      "https://ateettea.sirv.com/Applications/Roleplay/red-haradrim-warrior-lord-of-the-rings.png",
    goodSrc:
      "https://ateettea.sirv.com/Applications/Roleplay/Screenshot%202023-03-06%20110440.png",
  },
  {
    evilAlt: "dunlending wolf champion with a shield and horned helmet",
    goodAlt: "aragorn wearing rugged clothes and with a dirty face",
    evilSrc:
      "https://ateettea.sirv.com/Applications/Roleplay/Screenshot%202023-03-06%20110408.png",
    goodSrc:
      "https://ateettea.sirv.com/Applications/Roleplay/Screenshot%202023-03-06%20112729.png",
  },
]);

const formProgress = ref(25);
const currentStep = ref(0);
const formData = useRoleplayCharacterFormStore();

async function nextStep(formInput: any) {
  switch (formInput.step) {
    case 1:
      formData.characterName = formInput.characterName;
      formData.pvpPreference = formInput.pvpPreference;
      break;
    case 2:
      formData.characterTitle = formInput.characterTitle;
      formData.factionName = formInput.factionName;
      formData.characterReason = formInput.characterReason;
      break;
    case 3:
      formData.gear = formInput.gear;
      break;
    case 4:
      formData.linkToLore = formInput.linkToLore;
      // Verify if title is empty, to set it to faction
      if (formData.characterTitle === "") {
        formData.characterTitle = formData.factionName;
      }
      // SEND TO BACKEND AND REDIRECT TO APPLICATIONS
      ApplicationApiClient.createRoleplayApplication(formData).then(() => {
        router.push({
          name: "RoleplayCharacterApplicationEnd",
        });
      });
      return;
    default:
      // do something
      break;
  }
  currentStep.value++;
  formProgress.value += 25;
}

function previousStep(formInput: { step: number; linkToLore: string }) {
  // If we are on the last step, we need to set the linkToLore to persist it through the app
  if (formInput && formInput.step === 4) {
    formData.linkToLore = formInput.linkToLore;
  }
  currentStep.value--;
  formProgress.value -= 33;
}
</script>
