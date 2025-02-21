<script setup lang="ts">
defineProps({
  value: {
    type: Number,
    required: true,
    validate: (v: number) => v >= 0 && v <= 100,
  },
  hidePercentage: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="hstack gap-1">
    <div
      v-if="!hidePercentage"
      class="AVProgressBar--percentage hstack justify-content-center small rounded-1 text-white"
      :class="{
        'bg-success': value === 100,
        'bg-brand-dark': value !== 100,
      }"
    >
      {{ `${Math.round(value)}%` }}
    </div>

    <div class="AVProgressBar progress w-100 rounded-1">
      <div
        class="AVProgressBar--filling progress-bar"
        :class="{
          'bg-success': value === 100,
          'bg-brand-dark': value !== 100,
        }"
        :aria-label="`${value}%`"
        role="progressbar"
        :style="`width: ${value}%;`"
        :aria-valuenow="value"
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
  </div>
</template>

<style scoped lang="scss" src="./AVProgressBar.scss" />
