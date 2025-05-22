<script setup lang="ts">
import type { PropType, NormalResult, VoteCounts, Theme, SupportedLocale } from "@/types";
import { inject, onMounted, watch } from "vue";
import { switchLocale } from "@/i18n";

const props = defineProps({
  sortedResult: {
    type: Array as PropType<NormalResult[]>,
    required: true,
  },
  hidePercentage: {
    type: Boolean,
    default: false,
  },
  hideElected: {
    type: Boolean,
    default: false,
  },
  hideTied: {
    type: Boolean,
    default: false,
  },
  disregardBlank: {
    type: Boolean,
    default: false,
  },
  totalCount: {
    type: Number,
    required: true,
  },
  voteCounts: {
    type: Object as PropType<VoteCounts>,
    required: true,
  },
  theme: {
    type: String as PropType<Theme>,
    default: "light",
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: "en",
  },
});

const isPercentageHidden = (reference: string): boolean =>
  reference === "blank" && props.disregardBlank ? true : props.hidePercentage;

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
  <div class="AVNormalSummary--container vstack w-100">
    <div
      class="AVNormalSummary d-grid gap-2 w-100 mb-3"
      :class="{ 'dynamic-columns': sortedResult.length > 8 }"
    >
      <AVResultOption
        v-for="result in sortedResult"
        :key="`result_for_${result.reference}`"
        :option="{ title: result.title, reference: result.reference, image: result.image }"
        :votes="result.count"
        :total="totalCount"
        :elected="!hideElected && result.elected"
        :tied="!hideTied && result.tied"
        :hide-percentage="isPercentageHidden(result.reference)"
        data-test="result-option"
      />
    </div>

    <div class="vstack gap-1" data-test="summary">
      <AVResultSummaryItem
        :title="t('js.components.AVNormalSummary.summary.null_votes')"
        :value="voteCounts.excludedCount ?? 0"
        reference="null_votes"
        :theme="theme"
      />
    </div>
  </div>
</template>

<style scoped lang="scss" src="./AVNormalSummary.scss" />
