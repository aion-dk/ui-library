<script setup lang="ts">
import type { PropType, AVAnimatedMenuButtonVariant, Theme, SupportedLocale } from "@/types";
import { inject, onMounted, watch } from "vue";
import { switchLocale } from "@/i18n";

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
