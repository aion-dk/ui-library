<script setup lang="ts">
import type { PropType, AVTooltipPosition, IconName } from "@/types";

defineProps({
  text: {
    type: String,
    default: () => null,
  },
  content: {
    type: String,
    required: true,
  },
  position: {
    type: String as PropType<AVTooltipPosition>,
    default: "auto",
  },
  icon: {
    type: String as PropType<IconName>,
    default: () => null,
  },
  disabled: {
    type: Boolean,
    default: () => false,
  },
  options: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <span
    class="AVTooltip--wrapper"
    v-tooltip="{
      content: content,
      placement: position,
      disabled: disabled,
      ...options,
    }"
  >
    <span v-if="text" class="me-1">{{ text }}</span>
    <slot v-else name="text" />
    <AVIcon v-if="icon" :icon="icon" class="AVTooltip--icon" aria-hidden="true" />
  </span>
</template>

<style scoped src="./AVTooltip.css" />
