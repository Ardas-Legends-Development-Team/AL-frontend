<template>
  <dialog id="claimbuild_detail_modal" class="modal">
    <div class="modal-box h-screen max-w-screen-2xl">
      <!-- Ways to close the modal while clicking on cross and outside of it -->
      <form method="dialog">
        <button class="btn btn-circle btn-secondary absolute right-0 top-0">
          ✕
        </button>
      </form>
      <!-- Modal content -->
      <div class="grid h-full grid-cols-4">
        <div class="col-span-3">
          <ClaimbuildTopInfo :selected-claimbuild="selectedClaimbuild" />
          <ClaimbuildMiddleInfo :selected-claimbuild="selectedClaimbuild" />
          <ClaimbuildModalAccordions
            :selected-claimbuild="selectedClaimbuild"
          />
        </div>
        <div class="col-span-1">
          <LazyLoadedImage
            :inside-classes="'h-full w-max object-cover'"
            :evil-alt="
              getClaimbuildTypeImageAlt(
                selectedClaimbuild.claimBuildType,
                selectedClaimbuild.faction,
              )
            "
            :good-alt="
              getClaimbuildTypeImageAlt(
                selectedClaimbuild.claimBuildType,
                selectedClaimbuild.faction,
              )
            "
            :evil-src="
              getClaimbuildTypeImage(
                selectedClaimbuild.claimBuildType,
                selectedClaimbuild.faction,
              )
            "
            :good-src="
              getClaimbuildTypeImage(
                selectedClaimbuild.claimBuildType,
                selectedClaimbuild.faction,
              )
            "
          />
        </div>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import LazyLoadedImage from "@/components/images/LazyLoadedImage.vue";
import { Claimbuild } from "@/ts/types/Claimbuild";
import ClaimbuildTopInfo from "@/components/modals/ClaimbuildDetailModal/ClaimbuildTopInfo.vue";
import ClaimbuildMiddleInfo from "@/components/modals/ClaimbuildDetailModal/ClaimbuildMiddleInfo.vue";
import ClaimbuildModalAccordions from "@/components/modals/ClaimbuildDetailModal/ClaimbuildModalAccordions.vue";
import {
  getClaimbuildTypeImage,
  getClaimbuildTypeImageAlt,
} from "@/ts/ClaimbuildTypeImageEnum";

defineProps({
  selectedClaimbuild: {
    type: Object as () => Claimbuild,
    required: true,
  },
});
</script>
