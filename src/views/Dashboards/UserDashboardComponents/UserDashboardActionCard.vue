<template>
  <!-- Depending on if it's a rank action (contains leader), give the card a different background color -->
  <div
    class="h-fit w-28 cursor-pointer rounded-lg"
    :class="
      title.toLowerCase().includes('leader') ||
      title.toLowerCase().includes('create army') ||
      title.toLowerCase().includes('disband army')
        ? 'bg-accent-content'
        : 'bg-base-300'
    "
    @click="sendInfoToModal(title, description, actionInputs)"
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
  <UserDashboardCreateArmyActionModal
    :is-open="isCreateArmyModalOpen"
    @close="isCreateArmyModalOpen = false"
  />
  <UserDashboardDeclareBattleActionModal
    :is-open="isDeclareBattleModalOpen"
    @close="isDeclareBattleModalOpen = false"
  />
</template>

<script setup lang="ts">
import LazyLoadedImage from "@/components/images/LazyLoadedImage.vue";
import UserDashboardActionModal from "@/views/Dashboards/UserDashboardComponents/ActionModals/UserDashboardSimpleActionModal.vue";
import { ref } from "vue";
import { PlayerActionRequestHandler } from "@/ts/PlayerActionRequestHandler";
import { PlayerActionInput } from "@/ts/types/PlayerActionInput";
import UserDashboardCreateArmyActionModal from "@/views/Dashboards/UserDashboardComponents/ActionModals/UserDashboardCreateArmyActionModal.vue";
import UserDashboardDeclareBattleActionModal from "@/views/Dashboards/UserDashboardComponents/ActionModals/UserDashboardDeclareBattleActionModal.vue";

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
const isCreateArmyModalOpen = ref(false);
const isDeclareBattleModalOpen = ref(false);

function sendInfoToModal(
  title: string,
  description: string,
  actionInputs: any[],
) {
  // If the title contains "create army", open the create army modal
  if (title.toLowerCase().includes("create army")) {
    isCreateArmyModalOpen.value = true;
    return;
  }
  // Else if the title contains "declare battle", open the declare battle modal
  if (title.toLowerCase().includes("declare battle")) {
    isDeclareBattleModalOpen.value = true;
    return;
  }
  // Otherwise, open the simple action modal
  selectedAction.value.description = description;
  selectedAction.value.actionInputs = actionInputs;
  isModalOpen.value = true;
}

function submitAction(playerInputs: PlayerActionInput[]) {
  isModalOpen.value = false;
  PlayerActionRequestHandler.handleRequest(props.title, playerInputs);
}
</script>
