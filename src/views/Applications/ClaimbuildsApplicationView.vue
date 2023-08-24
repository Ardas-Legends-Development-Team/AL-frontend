<template>
  <section class="grid grid-cols-2 gap-4 h-screen justify-items-center">
    <div class="w-full px-4 py-12">
      <div class="max-w-lg text-center">
        <h1 class="text-2xl font-bold sm:text-3xl">Claimbuild Application</h1>

        <p class="mt-4 text-gray-500">
          Please read claimbuild rules on Discord before submitting
        </p>
      </div>

      <div class="mt-8 mb-0 max-w-3xl space-y-4">
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

    <div class="relative w-full h-full">
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
import ClaimbuildsApplicationStep0 from "@/components/applications/Claimbuilds/ClaimbuildsApplicationStep0.vue";
import ClaimbuildsApplicationStep1 from "@/components/applications/Claimbuilds/ClaimbuildsApplicationStep1.vue";
import ClaimbuildsApplicationStep2 from "@/components/applications/Claimbuilds/ClaimbuildsApplicationStep2.vue";
import ClaimbuildsApplicationStep3 from "@/components/applications/Claimbuilds/ClaimbuildsApplicationStep3.vue";
import ClaimbuildsApplicationStep4 from "@/components/applications/Claimbuilds/ClaimbuildsApplicationStep4.vue";
import { useClaimbuildsFormStore } from "@/stores/formStores";
import { ApplicationApiClient } from "@/ts/ApiService/ApplicationApiClient";
import LazyLoadedImage from "@/components/images/LazyLoadedImage.vue";
import { usePlayerStore } from "@/stores/playerStores";
import { isFactionEvil } from "@/ts/utilities";

const router = useRouter();
const steps = [
  ClaimbuildsApplicationStep0,
  ClaimbuildsApplicationStep1,
  ClaimbuildsApplicationStep2,
  ClaimbuildsApplicationStep3,
  ClaimbuildsApplicationStep4,
];
const stepsImages = ref<
  { evilAlt: string; goodAlt: string; evilSrc: string; goodSrc: string }[]
>([
  {
    evilAlt: "dark mountain hall with torches",
    goodAlt: "hobbit hamlet overlooking river",
    evilSrc:
      "https://ateettea.sirv.com/Applications/Claimbuild/balrogslayer_mines_of_moria_lord_of_the_rings_cinematic_lightin_eca83409-5d53-4013-98f5-51362c23d3a4.png",
    goodSrc:
      "https://ateettea.sirv.com/Applications/Claimbuild/balrogslayer_sunset_on_the_shire_hobbiton_lord_of_the_rings_war_6b17d4cb-9953-40d0-8134-6272c3d13d5f.png",
  },
  {
    evilAlt: "black tower with red mountain behind overlooking lake",
    goodAlt: "dalish town with clocktower",
    evilSrc:
      "https://ateettea.sirv.com/Applications/Claimbuild/Anedhel_lord_of_the_rings_painting_of_a_Mordor_fortress_intrica_c6857ff0-b041-438c-8837-e20450531fc5.png",
    goodSrc:
      "https://ateettea.sirv.com/Applications/Claimbuild/Anedhel_lord_of_the_rings_easterling_city_greg_rutkowski_intric_d8965ae2-9db9-4934-9ba7-795cfc23c2ed.png",
  },
  {
    evilAlt: "haradrim palace courtyard",
    goodAlt: "gondorian circular fortress",
    evilSrc:
      "https://ateettea.sirv.com/Applications/Claimbuild/Anedhel_lord_of_the_rings_painting_of_Haradrim_palace_greg_rutk_570de439-4448-4f0e-9454-368ddd9b002a.png",
    goodSrc:
      "https://ateettea.sirv.com/Applications/Claimbuild/Anedhel_lord_of_the_rings_gondor_circular_fortress_greg_rutkows_22b5f0a5-15bb-4cf0-83e7-90b0f19b51e4.png",
  },
  {
    evilAlt: "minas morgul without morgul energy",
    goodAlt: "dwarven dark mountain hall",
    evilSrc:
      "https://ateettea.sirv.com/Applications/Claimbuild/7fKkl02Z4mhnz3shsnzs--3--xmgi1_4x.jpg",
    goodSrc:
      "https://ateettea.sirv.com/Applications/Claimbuild/balrogslayer_mines_of_moria_lord_of_the_rings_cinematic_lightin_cead4c3f-1583-4c28-a862-a95f80ff0707.png",
  },
  {
    evilAlt: "black numenorean ominous lighthouse",
    goodAlt: "dunedain castle on top of a steep hill",
    evilSrc:
      "https://ateettea.sirv.com/Applications/Claimbuild/VdLcS3CwH67CHyldcEyj--4--ohqly_4x.jpg",
    goodSrc:
      "https://ateettea.sirv.com/Applications/Claimbuild/cdfd83ee-4dfa-4499-be2b-7cefce156353.jpg",
  },
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
      ApplicationApiClient.createClaimbuildApplication(formData).then(() => {
        router.push({
          name: "ClaimbuildApplicationEnd",
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

function previousStep(formInput: {
  step: number;
  traders: string;
  siege: string;
}) {
  if (formInput && formInput.step === 4) {
    formData.traders = formInput.traders;
    formData.siege = formInput.siege;
  }
  currentStep.value--;
  formProgress.value -= 25;
}
</script>
