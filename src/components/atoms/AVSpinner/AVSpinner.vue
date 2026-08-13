<script setup lang="ts">
import type {
  PropType,
  BootstrapColor,
  BootstrapBasicSize,
  AVSpinnerVariant,
  SupportedLocale,
} from "@/types";
import { useLocalization } from "@/composables/useLocalization";

const props = defineProps({
  variant: {
    type: String as PropType<AVSpinnerVariant>,
    default: "spinner-border",
  },
  size: {
    type: String as PropType<BootstrapBasicSize>,
    default: "md",
  },
  color: {
    type: String as PropType<BootstrapColor>,
    default: "primary",
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
});

const { t } = useLocalization(() => props.locale);
</script>

<template>
  <div :class="`${variant} text-${color} ${variant}-${size}`" role="status">
    <span class="visually-hidden">{{ t("js.components.AVSpinner.loading") }}</span>
  </div>
</template>

<style scoped lang="scss" src="./AVSpinner.scss" />
