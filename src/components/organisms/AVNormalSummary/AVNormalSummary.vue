<script setup lang="ts">
import type { PropType, NormalResult } from "@/types";

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
});

const isPercentageHidden = (reference: string): boolean =>
  reference === "blank" && props.disregardBlank ? true : props.hidePercentage;
</script>

<template>
  <div class="AVNormalSummary--container d-flex w-100">
    <div class="AVNormalSummary d-grid gap-2 w-100">
      <AVResultOption
        v-for="result in sortedResult"
        :key="`result_for_${result.reference}`"
        :optionTitle="result.title"
        :optionImage="result.image"
        :votes="result.count"
        :total="totalCount"
        :elected="!hideElected && result.elected"
        :tied="!hideTied && result.tied"
        :hide-percentage="isPercentageHidden(result.reference)"
        data-test="result-option"
      />
    </div>
  </div>
</template>

<style scoped lang="scss" src="./AVNormalSummary.scss" />
