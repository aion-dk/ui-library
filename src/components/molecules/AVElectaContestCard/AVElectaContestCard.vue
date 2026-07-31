<script setup lang="ts">
defineProps({
  contestTitle: {
    type: String,
    required: true,
  },
  votingRoundTitle: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="AVElectaContestCard bg-body border-0 py-3 px-4 vstack w-100">
    <h4 class="AVElectaContestCard--title mb-1 text-body-90">{{ contestTitle }}</h4>
    <h5 class="AVElectaContestCard--subtitle h6 m-0 text-body-70">{{ votingRoundTitle }}</h5>
    <div class="AVElectaContestCard--line" />
    <slot name="card-content" />
  </div>
</template>

<style scoped src="./AVElectaContestCard.scss" />
