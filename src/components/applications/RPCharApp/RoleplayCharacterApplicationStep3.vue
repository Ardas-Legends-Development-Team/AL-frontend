<template>
  <div>
    <label for="ign" class="sr-only"
      >What gear do you wish to use for this character?</label
    >

    <div class="relative">
      <textarea
        class="textarea textarea-bordered textarea-lg w-full max-w-xs"
        placeholder="What gear do you wish to use for this character?"
      ></textarea>
    </div>
  </div>
  <p></p>
  <div>
    <label for="charname" class="sr-only"
      >A brief summary of the character</label
    >
    <div class="relative">
      <textarea
        class="textarea textarea-bordered textarea-lg w-full max-w-xs"
        placeholder="A brief summary of the character"
      ></textarea>
      <label class="label">
        <span class="label-text text-secondary">
          If you are planning on writing a good amount of lore, please share a
          link above
        </span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
