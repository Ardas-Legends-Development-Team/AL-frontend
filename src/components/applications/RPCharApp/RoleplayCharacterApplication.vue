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

      <form action="" class="mx-auto mt-8 mb-0 max-w-md space-y-4">
        <RoleplayCharacterApplicationStep3 />
        <div class="btn-group grid grid-cols-2">
          <button class="btn btn-outline">Previous page</button>
          <button class="btn btn-outline">Next</button>
        </div>
        <progress
          class="progress progress-primary w-full"
          value="100"
          max="100"
        ></progress>
      </form>
    </div>

    <div class="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
      <img
        alt="rohan shieldmaiden"
        src="https://media.discordapp.net/attachments/1068863871772790865/1070856198196314182/Jorundr_in_the_style_of_charlie_bowater_full_body_pose_24mn_blo_0f80d875-0ac4-48d5-bba7-7081157571d7.png?width=905&height=1357"
        class="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import RoleplayCharacterApplicationStep1 from "@/components/applications/RPCharApp/RoleplayCharacterApplicationStep1.vue";
import RoleplayCharacterApplicationStep2 from "@/components/applications/RPCharApp/RoleplayCharacterApplicationStep2.vue";
import RoleplayCharacterApplicationStep3 from "@/components/applications/RPCharApp/RoleplayCharacterApplicationStep3.vue";

const steps = [
  RoleplayCharacterApplicationStep1,
  RoleplayCharacterApplicationStep2,
  RoleplayCharacterApplicationStep3,
];
</script>
