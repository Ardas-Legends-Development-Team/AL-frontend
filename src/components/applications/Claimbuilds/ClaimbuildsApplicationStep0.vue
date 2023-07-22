<template>
  <div>
    <div class="label label-text text-secondary">
      <ul>
        <li><b>Notes:</b></li>

        <li>
          <br />
          You can lose your builds in wars if you submit for it to be a
          claimbuild.
        </li>
        <li>
          <br />
          If a faction has no leader, the monthly resources for a build are
          claimable by each player for their build. If a faction does have a
          leader, it is up to the faction leader to split the resources among
          faction members.
        </li>
        <li>
          <br />
          We strive to review claimbuild applications within 48 hours.
          Unfortunately, we're not always able to meet this goal due to personal
          and professional lives. If you notice that your application does not
          have any votes after 48 hours, please tag an admin.
        </li>
        <li>
          <br />
          A positive number of flamingos after 48 hours OR a majority of admin
          votes means your application is approved. A thread will be made by an
          admin outlining what needs to change in your build if it has not been
          accepted.
        </li>
      </ul>
    </div>
  </div>

  <button class="btn btn-outline w-full" @click="nextStep()">OK!</button>
</template>

<script setup lang="ts">
// previousStep event is not used in this component, but in the next 2 steps
const emit = defineEmits(["nextStep", "previousStep"]);

function nextStep() {
  emit("nextStep", {
    step: 0,
  });
}
</script>
