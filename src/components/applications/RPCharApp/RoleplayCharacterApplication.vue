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
          value="100"
          max="100"
        ></progress>
      </div>
    </div>

    <div class="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
      <img
        alt="roleplay image"
        :src="stepsImages[currentStep]"
        class="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import RoleplayCharacterApplicationStep1 from "@/components/applications/RPCharApp/RoleplayCharacterApplicationStep1.vue";
import RoleplayCharacterApplicationStep2 from "@/components/applications/RPCharApp/RoleplayCharacterApplicationStep2.vue";
import RoleplayCharacterApplicationStep3 from "@/components/applications/RPCharApp/RoleplayCharacterApplicationStep3.vue";

const router = useRouter();
const steps = [
  RoleplayCharacterApplicationStep1,
  RoleplayCharacterApplicationStep2,
  RoleplayCharacterApplicationStep3,
];

const stepsImages = ref<String[]>([
  "https://media.discordapp.net/attachments/1068863871772790865/1070856198196314182/Jorundr_in_the_style_of_charlie_bowater_full_body_pose_24mn_blo_0f80d875-0ac4-48d5-bba7-7081157571d7.png?width=905&height=1357",
  "https://cdn.discordapp.com/attachments/1068863871772790865/1070856200062779483/hkjj_the_lord_of_the_rings_sauron_--v_4_b4e77a28-5d4d-4fec-9db3-97f661a0e12e.png",
  "https://cdn.discordapp.com/attachments/1068863871772790865/1070856213241282560/RBOYLE_male_dark_color_hard_rim_light_ray_tracing_side_profile__3ac5305c-2db5-477d-bb0e-c2d9b63357cb.png",
]);

const currentStep = ref(0);
const formData = {
  ign: "",
  charName: "",
  pvp: false,
  title: "",
  reason: "",
  faction: "",
  gear: "",
  summary: "",
};

function nextStep(formInput: any) {
  currentStep.value++;
  console.log(formInput);
  switch (formInput.step) {
    case 1:
      formData.ign = formInput.ign;
      formData.charName = formInput.charName;
      formData.pvp = formInput.preference === "PvP";
      break;
    case 2:
      formData.title = formInput.title;
      formData.reason = formInput.reason;
      formData.faction = formInput.faction;
      break;
    case 3:
      formData.gear = formInput.gear;
      formData.summary = formInput.summary;
      // SEND TO BACKEND AND REDIRECT TO APPLICATIONS
      console.log(formData);
      router.push({
        name: "RoleplayCharacterApplicationEnd",
      });
      break;
    default:
      // do something
      break;
  }
}

function previousStep() {
  currentStep.value--;
}
</script>
