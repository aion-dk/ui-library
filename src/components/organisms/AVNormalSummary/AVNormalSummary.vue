<script setup lang="ts">
import type { PropType, NormalResult, VoteCounts } from "@/types";
import { inject } from "vue";
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
    required: false,
  },
});

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
const i18n: any = inject("i18n");
const { t } = i18n.global;
const isPercentageHidden = (reference: string): boolean =>
  reference === "blank" && props.disregardBlank ? true : props.hidePercentage;
</script>

<template>
  <div class="AVNormalSummary--container d-flex w-100">
    <div
      class="AVNormalSummary d-grid gap-2 w-100"
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
    <div v-if="voteCounts">
      <p class="mb-0">
        {{ t("js.components.AVDhondtSummary.summary.null_votes") }}: {{ voteCounts.excludedCount }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./AVNormalSummary.scss" />
