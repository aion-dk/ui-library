<script setup lang="ts">
import { ref, watch } from "vue";
import type { PropType, AVASyncButtonVariant, BootstrapBasicSize } from "@/types";

const emit = defineEmits(["update:waiting"]);

const props = defineProps({
  size: {
    type: String as PropType<BootstrapBasicSize>,
    default: "md",
  },
  variant: {
    type: String as PropType<AVASyncButtonVariant>,
    default: "brand-dark",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  onClick: {
    type: Function,
    default: () => new Promise((r) => setTimeout(r, 500)),
  },
});

const waiting = ref(false);

watch(waiting, (newStatus) => emit("update:waiting", newStatus));

async function handleClick(event: MouseEvent) {
  waiting.value = true;
  try {
    await Promise.resolve(props.onClick(event));
  } finally {
    waiting.value = false;
  }
}
</script>

<template>
  <button
    :disabled="disabled || waiting"
    @click="handleClick"
    class="AVAsyncButton btn hstack gap-1"
    :class="{
      [`btn-${variant}`]: variant,
      [`btn-${size}`]: size,
      'AVAsyncButton--waiting': waiting,
      disabled: !waiting && disabled,
    }"
  >
    <template v-if="waiting">
      <AVSpinner color="light" size="sm" data-test="btn-spinner" />
      <slot name="waitingLabel" />
    </template>
    <template v-else>
      <slot name="label" />
    </template>
  </button>
</template>

<style scoped src="./AVAsyncButton.scss" />
