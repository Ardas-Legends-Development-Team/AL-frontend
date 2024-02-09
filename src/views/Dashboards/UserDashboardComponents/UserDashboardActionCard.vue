<template>
  <!-- Depending on if it's a rank action (contains leader), give the card a different background color -->
  <div
    class="h-fit w-28 cursor-pointer rounded-lg"
    :class="
      title.toLowerCase().includes('leader')
        ? 'bg-accent-content'
        : 'bg-base-300'
    "
    @click="sendInfoToModal(description, actionInputs)"
  >
    <LazyLoadedImage
      :evil-alt="altEvil"
      :good-alt="altGood"
      :evil-src="sourceEvil"
      :good-src="sourceGood"
    />
    <div class="flex flex-row justify-end px-2 pb-2 text-sm text-secondary">
      {{ title }}
    </div>
  </div>
  <UserDashboardActionModal
    v-if="isModalOpen"
    :is-open="isModalOpen"
    :description="selectedAction.description"
    :action-inputs="selectedAction.actionInputs"
    :action-type="title"
    @close="isModalOpen = false"
    @submit="(playerInputs: PlayerActionInput[]) => submitAction(playerInputs)"
  />
</template>

<script setup lang="ts">
import LazyLoadedImage from "@/components/images/LazyLoadedImage.vue";
import UserDashboardActionModal from "@/views/Dashboards/UserDashboardComponents/UserDashboardActionModal.vue";
import { ref } from "vue";
import { PlayerActionRequestHandler } from "@/ts/PlayerActionRequestHandler";
import { PlayerActionInput } from "@/ts/types/PlayerActionInput";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  sourceGood: {
    type: String,
    required: true,
  },
  altGood: {
    type: String,
    required: true,
  },
  sourceEvil: {
    type: String,
    required: true,
  },
  altEvil: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  actionInputs: {
    type: Array,
    required: true,
  },
});

const selectedAction = ref({
  description: "",
  actionInputs: [
    {
      type: "",
      placeholder: "",
      chooseFrom: [],
      representedData: "",
    },
  ],
});

const isModalOpen = ref(false);

function sendInfoToModal(description: string, actionInputs: any[]) {
  selectedAction.value.description = description;
  selectedAction.value.actionInputs = actionInputs;
  isModalOpen.value = true;
}

function submitAction(playerInputs: PlayerActionInput[]) {
  isModalOpen.value = false;
  PlayerActionRequestHandler.handleRequest(props.title, playerInputs);
}
</script>
