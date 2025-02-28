<script setup lang="ts">
import type { PropType, AVAnimatedMenuButtonVariant, Theme } from "@/types";

const emit = defineEmits(["update:isOpened"]);

defineProps({
  isOpened: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String as PropType<AVAnimatedMenuButtonVariant>,
    default: "cross",
  },
  theme: {
    type: String as PropType<Theme>,
    default: "dark",
  },
});
</script>

<template>
  <button
    class="AVAnimatedMenuButton position-relative border-0 d-grid p-0 rounded-2 overflow-hidden"
    :class="{
      'AVAnimatedMenuButton--opened': isOpened,
      [`AVAnimatedMenuButton--${theme}`]: true,
    }"
    @click="emit('update:isOpened', !isOpened)"
  >
    <span
      class="AVAnimatedMenuButton--icon"
      :class="{
        [`AVAnimatedMenuButton--${variant}-opened`]: isOpened,
        [`AVAnimatedMenuButton--icon-${theme}`]: true,
      }"
    >
      <span class="AVAnimatedMenuButton--line" />
      <span class="AVAnimatedMenuButton--line" />
      <span class="AVAnimatedMenuButton--line" />
    </span>
  </button>
</template>

<style scoped lang="scss" src="./AVAnimatedMenuButton.scss" />
