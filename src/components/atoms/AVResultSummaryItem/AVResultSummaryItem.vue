<script setup lang="ts">
import type { PropType, Theme } from "@/types";

defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
  theme: {
    type: String as PropType<Theme>,
    default: "light",
  },
});
</script>

<template>
  <p class="m-0" :class="`AVResultSummaryItem--text-${theme}`" :data-test="reference">
    <strong> {{ title }}: </strong>
    {{ value }}
  </p>
</template>

<style scoped lang="scss" src="./AVResultSummaryItem.scss" />
