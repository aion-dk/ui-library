<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type { PropType, BootstrapColor, BootstrapBasicSize } from "@/types";

const emit = defineEmits(["update:waiting"]);

const props = defineProps({
  size: {
    type: String as PropType<BootstrapBasicSize>,
    default: "md",
  },
  variant: {
    type: String as PropType<BootstrapColor>,
    default: "brand-dark",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  extraPadding: {
    type: Boolean,
    default: false,
  },
  onClick: {
    type: Function,
    default: () => new Promise((r) => setTimeout(r, 500)),
  },
});

const waiting = ref(false);

const extraPaddings = computed(() => {
  if (props.size === "sm") return "py-1 px-3";
  else if (props.size === "lg") return "py-2 px-5";
  else return "py-2 px-4";
});

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
      [`${extraPaddings}`]: extraPadding,
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
