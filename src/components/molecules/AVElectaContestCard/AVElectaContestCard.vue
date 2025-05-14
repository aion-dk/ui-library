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
  <div class="AVElectaContestCard bg-white border-0 py-3 px-4 vstack w-100">
    <h4 class="AVElectaContestCard--title mb-1 text-gray-900">{{ contestTitle }}</h4>
    <h5 class="AVElectaContestCard--subtitle h6 m-0 text-gray-700">{{ votingRoundTitle }}</h5>
    <div class="AVElectaContestCard--line" />
    <slot name="card-content" />
  </div>
</template>

<style scoped src="./AVElectaContestCard.scss" />
