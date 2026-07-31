<script setup lang="ts">
import type { PropType, NormalResult, VoteCounts, SupportedLocale } from "@/types";
import { useLocalization } from "@/composables/useLocalization";

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
  locale: {
    type: String as PropType<SupportedLocale>,
    default: "en",
  },
});

const isPercentageHidden = (reference: string): boolean =>
  reference === "blank" && props.disregardBlank ? true : props.hidePercentage;

const { t } = useLocalization(() => props.locale);
</script>

<template>
  <div class="AVNormalSummary--container vstack w-100">
    <div
      class="AVNormalSummary d-grid gap-2 w-100 mb-3"
      :class="{ 'dynamic-columns': sortedResult.length > 8 }"
    >
      <AVResultOption
        v-for="option in sortedResult"
        :key="`result_for_${option.reference}`"
        :option="{ title: option.title, reference: option.reference, image: option.image }"
        :votes="option.count"
        :total="totalCount"
        :elected="!hideElected && option.elected"
        :tied="!hideTied && option.tied"
        :ineligible="option.ineligible"
        :hide-percentage="isPercentageHidden(option.reference)"
        data-test="result-option"
      />
    </div>

    <div class="vstack gap-1" data-test="summary">
      <AVResultSummaryItem
        v-if="Number.isFinite(voteCounts.excludedCount)"
        :title="t('js.components.AVNormalSummary.summary.null_votes')"
        :value="voteCounts.excludedCount"
        reference="null_votes"
      />
    </div>
  </div>
</template>

<style scoped lang="scss" src="./AVNormalSummary.scss" />
