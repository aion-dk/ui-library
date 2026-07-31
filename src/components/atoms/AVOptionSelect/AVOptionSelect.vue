<script setup lang="ts">
import { computed } from "vue";
import type { PropType, SupportedLocale } from "@/types";
import { useLocalization } from "@/composables/useLocalization";

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
    const label = t("js.components.AVOptionSelect.aria_label");
    return document.getElementsByTagName("html")[0].dir === "rtl"
      ? `${props.rank} ${label}`
      : `${label} ${props.rank}`;
  } else {
    return "";
  }
});

const { t } = useLocalization(() => props.locale);
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
