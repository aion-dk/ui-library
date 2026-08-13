<script setup lang="ts">
import type { PropType, SupportedLocale, PartialResult, AVOptionLiveResultsMode } from "@/types";
import type AVTweenedCount from "../AVTweenedCount/AVTweenedCount.vue";
import { useLocalization } from "@/composables/useLocalization";

const props = defineProps({
  optionReference: {
    type: String,
    required: true,
  },
  partialResults: {
    type: Object as PropType<PartialResult>,
    default: null,
  },
  mode: {
    type: String as PropType<AVOptionLiveResultsMode>,
    default: "internal",
  },
  showPercentage: {
    type: Boolean,
    default: false,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: null,
  },
});

const { t } = useLocalization(() => props.locale);
</script>

<template>
  <div
    :id="`option_${optionReference}_partial_results`"
    class="AVOptionLiveResults hstack gap-2"
    :class="{
      'mt-1 ms-1': mode === 'external',
    }"
    :data-test="`partial-results-${mode}`"
  >
    <AVIcon icon="user" />
    <span class="text-nowrap">
      <AVTweenedCount
        :id="`count_for_option_${optionReference}`"
        :count="partialResults.results.count"
        :duration="0.5"
      />
      {{
        partialResults.results.count === 1
          ? t("js.components.AVOptionLiveResults.vote_count_singular")
          : t("js.components.AVOptionLiveResults.vote_count_plural")
      }}
    </span>

    <template v-if="showPercentage">
      <span>-</span>
      <span>
        <AVTweenedCount
          :id="`percentage_for_option_${optionReference}`"
          :count="partialResults.results.percentage"
          :duration="0.5"
          :decimals="1"
        />%
      </span>
    </template>
  </div>
</template>

<style scoped lang="scss" src="./AVOptionLiveResults.scss" />
