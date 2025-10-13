<script setup lang="ts">
import { computed, inject, onMounted, watch } from "vue";
import { switchLocale } from "@/i18n";
import type { PropType, SupportedLocale } from "@/types";

const props = defineProps({
  checked: {
    type: Boolean,
    default: false,
  },
  rank: {
    type: [Number, null],
    default: null,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
});

const optionAriaLabel = computed(() => {
  if (props.rank) {
    return document.getElementsByTagName("html")[0].dir === "rtl"
      ? `${props.rank} ${
          i18n.global.messages.value
            ? i18n.global.messages.value[i18nLocale.value].js.components.AVOptionSelect.aria_label
            : i18n.global.messages[i18nLocale.value].js.components.AVOptionSelect.aria_label
        }`
      : `${
          i18n.global.messages.value
            ? i18n.global.messages.value[i18nLocale.value].js.components.AVOptionSelect.aria_label
            : i18n.global.messages[i18nLocale.value].js.components.AVOptionSelect.aria_label
        } ${props.rank}`;
  } else {
    return "";
  }
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
const i18nLocale = computed(() => i18n.global.locale.value || i18n.global.locale);
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
  <div
    v-show="checked"
    class="text-white AVOptionSelect"
    :aria-label="optionAriaLabel"
    data-test="option-select"
  >
    <strong v-if="rank" aria-hidden="true" data-test="rank">{{ rank }}</strong>
    <svg
      v-else
      width="26"
      height="26"
      stroke="white"
      stroke-width="0.25rem"
      aria-hidden="true"
      data-test="check"
    >
      <line x1="25%" y1="25%" x2="75%" y2="75%" />
      <line x1="75%" y1="25%" x2="25%" y2="75%" />
    </svg>
  </div>
</template>

<style scoped lang="scss" src="./AVOptionSelect.scss" />
