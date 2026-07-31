<script setup lang="ts">
import type { PropType, AVAnimatedMenuButtonVariant, Theme, SupportedLocale } from "@/types";
import { useLocalization } from "@/composables/useLocalization";

const emit = defineEmits(["update:isOpened"]);

const props = defineProps({
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
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
});

const { t } = useLocalization(() => props.locale);
</script>

<template>
  <button
    class="AVAnimatedMenuButton position-relative border-0 d-grid p-0 rounded-2 overflow-hidden"
    :class="{
      'AVAnimatedMenuButton--opened': isOpened,
      [`AVAnimatedMenuButton--${theme}`]: true,
    }"
    :aria-label="
      t(`js.components.AVAnimatedMenuButton.${isOpened ? 'aria_collapse' : 'aria_expand'}`)
    "
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
