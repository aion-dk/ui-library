<script setup lang="ts">
import type {
  PropType,
  BootstrapColor,
  BootstrapBasicSize,
  AVSpinnerVariant,
  SupportedLocale,
} from "@/types";
import { watch, inject, onMounted } from "vue";
import { switchLocale } from "@/i18n";

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

/**
 * This is necesary in order to support both provided i18n and local i18n.
 * The used locale will be taken from the provided i18n as long as there is one
 * (this happens when we plug-in the library into a product, as electa or evs),
 * otherwise, it will take the locale from the local i18n instance.
 * Removing it, will cause all tests, storybook and the playground to break.
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const i18n: any = inject("i18n");
const { t } = i18n.global;
onMounted(() => {
  if (props.locale) switchLocale(props.locale);
});
watch(
  () => props.locale,
  () => {
    if (props.locale) switchLocale(props.locale);
  },
  { deep: true },
);
/* END */
</script>

<template>
  <div :class="`${variant} text-${color} ${variant}-${size}`" role="status">
    <span class="visually-hidden">{{ t("js.components.AVSpinner.loading") }}</span>
  </div>
</template>

<style scoped lang="scss" src="./AVSpinner.scss" />
