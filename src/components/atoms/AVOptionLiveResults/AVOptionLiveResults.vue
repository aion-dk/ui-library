<script setup lang="ts">
import { inject, onMounted, watch } from "vue";
import type { PropType, SupportedLocale, PartialResult, AVOptionLiveResultsMode } from "@/types";
import { switchLocale } from "@/i18n";

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
  <div
    :id="`option_${optionReference}_partial_results`"
    class="AVOptionLiveResults hstack gap-2"
    :class="{
      'mt-1 ms-1': mode === 'external',
    }"
    :data-test="`partial-results-${mode}`"
  >
    <AVIcon icon="user" />
    <span>
      {{
        partialResults.results.count === 1
          ? t("js.components.AVOptionLiveResults.vote_count_singular", {
              n: partialResults.results.count,
            })
          : t("js.components.AVOptionLiveResults.vote_count_plural", {
              n: partialResults.results.count,
            })
      }}
    </span>

    <template v-if="showPercentage">
      <span>-</span>
      <span>
        {{ `${partialResults.results.percentage}%` }}
      </span>
    </template>
  </div>
</template>

<style scoped src="./AVOptionLiveResults.css" />
