<script setup lang="ts">
import { computed } from "vue";
import type {
  AVRankedSummaryResultOptionRow,
  SupportedLocale,
  Theme,
  PropType,
  IterableObject,
  VoteCounts,
} from "@/types";
import { getMeaningfulLabel } from "@/helpers/meaningfulLabel";
import { useLocalization } from "@/composables/useLocalization";

const props = defineProps({
  result: {
    type: Array as PropType<Array<AVRankedSummaryResultOptionRow>>,
    required: true,
  },
  distributionNumber: {
    type: Number,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  locale: {
    type: String as PropType<SupportedLocale>,
    default: "en",
  },
  hideElected: {
    type: Boolean,
    default: false,
  },
  hideTied: {
    type: Boolean,
    default: false,
  },
  voteCounts: {
    type: Object as PropType<VoteCounts>,
    required: true,
  },
  theme: {
    type: String as PropType<Theme>,
    default: "light",
  },
});

const roundCount = computed(() => {
  return props.result[0]?.rounds?.length ?? 0;
});

const elected = computed(() => {
  return props.result
    .filter((row: AVRankedSummaryResultOptionRow) => row.elected)
    .map((row: AVRankedSummaryResultOptionRow) => {
      return (
        getMeaningfulLabel(
          { reference: row.reference, title: row.title },
          i18nLocale.value,
          t("js.components.AVOption.aria_labels.option"),
        ) ?? Object.values(row.title)[0]
      );
    });
});

const tied = computed(() => {
  return props.result
    .filter((row: AVRankedSummaryResultOptionRow) => row.tied)
    .map((row: AVRankedSummaryResultOptionRow) => {
      return (
        getMeaningfulLabel(
          { reference: row.reference, title: row.title },
          i18nLocale.value,
          t("js.components.AVOption.aria_labels.option"),
        ) ?? Object.values(row.title)[0]
      );
    });
});

const { locale: i18nLocale, t } = useLocalization(() => props.locale);
</script>

<template>
  <div class="table-responsive">
    <table
      class="table border"
      :class="{
        'border-light': theme === 'dark',
      }"
      id="ranked_summary_table"
      data-test="table"
    >
      <thead class="bg-secondary border-bottom">
        <tr>
          <th>{{ t("js.components.AVRankedSummary.header.position") }}</th>
          <th>{{ t("js.components.AVRankedSummary.header.candidate") }}</th>
          <th
            v-for="roundNumber in roundCount"
            :key="`header_for_round_${roundNumber}`"
            class="text-center text-nowrap"
          >
            {{
              t("js.components.AVRankedSummary.header.round_n", {
                n: roundNumber,
              })
            }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(option, index) in result"
          :key="`option_${option.reference}`"
          data-test="candidate-ranked-result"
          :class="{ 'border-0 border-bottom border-3': index + 1 === elected.length }"
        >
          <td :class="`AVRankedSummary--text-${theme}`">
            {{ (option.elected && index + 1) || "" }}
          </td>
          <td :class="`AVRankedSummary--text-${theme}`">
            {{
              getMeaningfulLabel(
                option as unknown as IterableObject,
                i18nLocale,
                t("js.components.AVOption.aria_labels.option"),
              )
            }}
          </td>

          <td
            v-for="(round, index) in option.rounds"
            :key="`round_nr_${index}`"
            class="text-center text-nowrap"
            :data-test="`${option.reference}_round_${index}`"
            :class="{
              'bg-warning-faded': !hideTied && round.tied && (hideElected || !round.elected),
              'bg-success-faded': !hideElected && round.elected,
              'AVRankedSummary--text-bold': round.elected,
              [`AVRankedSummary--text-${theme}`]: !round.elected && !round.tied,
            }"
          >
            {{ round.count }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="vstack gap-1" data-test="summary">
    <AVResultSummaryItem
      :title="t('js.components.AVRankedSummary.summary.seats')"
      :value="seats"
      reference="seats"
      :theme="theme"
    />

    <AVResultSummaryItem
      v-if="distributionNumber > 0"
      :title="t('js.components.AVRankedSummary.summary.distribution')"
      :value="distributionNumber"
      reference="distribution_n"
      :theme="theme"
    />

    <AVResultSummaryItem
      v-if="elected.length > 0 && !hideElected"
      :title="t('js.components.AVRankedSummary.summary.elected')"
      :value="elected.join(', ')"
      reference="elected"
      :theme="theme"
    />

    <AVResultSummaryItem
      v-if="tied.length > 0 && !hideTied"
      :title="t('js.components.AVRankedSummary.summary.tied')"
      :value="tied.join(', ')"
      reference="tied"
      :theme="theme"
    />

    <AVResultSummaryItem
      :title="t('js.components.AVRankedSummary.summary.blank_votes')"
      :value="voteCounts.blankCount"
      reference="blank_votes"
      :theme="theme"
    />

    <AVResultSummaryItem
      v-if="Number.isFinite(voteCounts.excludedCount)"
      :title="t('js.components.AVRankedSummary.summary.null_votes')"
      :value="voteCounts.excludedCount"
      reference="null_votes"
      :theme="theme"
    />
  </div>
</template>

<style scoped lang="scss" src="./AVRankedSummary.scss" />
