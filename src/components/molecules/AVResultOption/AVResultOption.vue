<script setup lang="ts">
import { computed, inject, onMounted, watch } from "vue";
import type { PropType, SupportedLocale, OptionContent, IterableObject } from "@/types";
import { getMeaningfulLabel } from "@/helpers/meaningfulLabel";
import { switchLocale } from "@/i18n";

const props = defineProps({
  option: {
    type: Object as PropType<OptionContent>,
    required: true,
  },
  votes: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  elected: {
    type: Boolean,
    default: false,
  },
  tied: {
    type: Boolean,
    default: false,
  },
  hidePercentage: {
    type: Boolean,
    default: false,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
});

const optionPercent = computed(() =>
  props.total > 0 ? Math.round((props.votes / props.total) * 10000) / 100 : 0,
);

const truncatedVotes = computed(() => Math.round(props.votes * 100) / 100);

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
    class="d-flex p-3"
    :class="{
      'bg-secondary': !tied && !elected,
      'bg-success-faded': elected,
      'bg-warning-faded': tied && !elected,
    }"
    data-test="result-option"
  >
    <div
      class="hstack justify-content-between w-100"
      v-tooltip="
        getMeaningfulLabel(
          option as unknown as IterableObject,
          i18nLocale,
          t('js.components.AVOption.aria_labels.option'),
        )
      "
    >
      <div class="hstack gap-3 overflow-hidden text-nowrap">
        <img
          v-if="option.image"
          :src="option.image"
          class="AVResultOption--image ratio ratio-1x1"
          aria-hidden="true"
          data-test="result-image"
        />
        <span class="text-truncate" data-test="result-title">
          {{
            getMeaningfulLabel(
              option as unknown as IterableObject,
              i18nLocale,
              t("js.components.AVOption.aria_labels.option"),
            )
          }}
        </span>
      </div>
      <div class="vstack align-items-end gap-1" data-test="result-results">
        <p class="mb-0">{{ truncatedVotes }}</p>
        <p v-if="!hidePercentage" class="text-dark mb-0">{{ optionPercent }}%</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./AVResultOption.scss" />
