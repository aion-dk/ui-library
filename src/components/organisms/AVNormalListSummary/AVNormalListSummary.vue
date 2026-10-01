<script setup lang="ts">
import { computed } from "vue";
import type {
  PropType,
  NormalResult,
  VoteCounts,
  SupportedLocale,
  OptionContent,
  IterableObject,
} from "@/types";
import { getMeaningfulLabel } from "@/helpers/meaningfulLabel";
import { useLocalization } from "@/composables/useLocalization";

const props = defineProps({
  options: {
    type: Array as PropType<OptionContent[]>,
    required: true,
  },
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

const resultByReference = computed(
  () => new Map(props.sortedResult.map((result) => [result.reference, result])),
);

const toResults = (options: OptionContent[]): NormalResult[] =>
  options.flatMap((option) => {
    const result = resultByReference.value.get(option.reference);
    return result ? [{ ...result, image: result.image || option.image }] : [];
  });

const groups = computed(() =>
  props.options
    .filter((option) => option.children?.length)
    .map((parent) => {
      const rows = toResults([...(parent.selectable ? [parent] : []), ...(parent.children ?? [])]);
      return {
        parent,
        rows,
        seats: rows.filter((row) => row.elected).length,
      };
    }),
);

const ungrouped = computed(() =>
  toResults(props.options.filter((option) => !option.children?.length)),
);

const others = computed(() => {
  const references = new Set(
    props.options.flatMap((option) => [
      option.reference,
      ...(option.children ?? []).map((child) => child.reference),
    ]),
  );
  return props.sortedResult.filter((result) => !references.has(result.reference));
});

const isPercentageHidden = (reference: string): boolean =>
  reference === "blank" && props.disregardBlank ? true : props.hidePercentage;

const { locale: i18nLocale, t } = useLocalization(() => props.locale);
</script>

<template>
  <div class="AVNormalListSummary--container vstack w-100">
    <div v-if="ungrouped.length" class="vstack gap-2 mb-3" data-test="ungrouped">
      <AVResultOption
        v-for="option in ungrouped"
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

    <section
      v-for="group in groups"
      :key="`group_for_${group.parent.reference}`"
      class="vstack gap-2 mb-3"
      data-test="result-group"
    >
      <div class="hstack justify-content-between gap-3 p-3 border bg-body">
        <h3 class="fs-6 fw-normal mb-0 text-body" data-test="group-title">
          {{
            getMeaningfulLabel(
              group.parent as unknown as IterableObject,
              i18nLocale,
              t("js.components.AVOption.aria_labels.option"),
            )
          }}
        </h3>
        <small v-if="!hideElected" class="text-body-70 text-nowrap" data-test="group-seats">
          {{ t("js.components.AVNormalListSummary.group.seats", {}, group.seats) }}
        </small>
      </div>

      <AVResultOption
        v-for="option in group.rows"
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
    </section>

    <div v-if="others.length" class="vstack gap-2 mb-3" data-test="others">
      <AVResultOption
        v-for="option in others"
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
        :title="t('js.components.AVNormalListSummary.summary.null_votes')"
        :value="voteCounts.excludedCount"
        reference="null_votes"
      />
    </div>
  </div>
</template>

<style scoped lang="scss" src="./AVNormalListSummary.scss" />
